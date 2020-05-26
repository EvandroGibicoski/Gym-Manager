const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils')


exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
}

exports.show = function(req, res) {
    const { id } = req.params;
    
    const foundMember = data.members.find(function(member) {
       return member.id == id;
    });
        if(!foundMember)
            return res.send("Instructor not found!")

        const member = {
            ...foundMember,
            age: age(foundMember.birth),
            gender: foundMember.gender,
            services: foundMember.services.split(","),
            created_at: new Intl.DateTimeFormat("pt-br").format(foundMember.created_at)

        }
            return res.render("members/show", { member })
    
}
exports.create = function(req, res) {
    return res.render('members/create');
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("please, fill the fields!")
        }
    }
    
    let {
         avatar_url,
         name, 
         email,
         birth, 
         gender, 
         blood,
         weight,
         height,
        } = req.body;

    birth = Date.parse(birth);

    let id = 1;
    const lastMember = data.members[data.members.length - 1];
        if(lastMember){
            id = lastMember.id + 1;
        }

    data.members.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) 
        return res.send("write file error!");
        return res.redirect("/members");
    });

};

exports.edit = function(req, res) {
    const { id } = req.params;
    
    const foundMember = data.members.find(function(member) {
       return member.id == id;
    });
        if(!foundMember)
            return res.send("Instructor not found!")
    
            const member = {
                ...foundMember,
                birth: date(foundMember.birth)
            }

            return res.render("members/edit", { member })
}

exports.put = function(req, res) {
    const { id } = req.body;
    let index = 0;
    
    const foundMember = data.members.find(function(member, foundIndex) {
       if(id == member.id) {
           index = foundIndex;
           return true
       };
    });
        if(!foundMember)
            return res.send("Instructor not found!")
        
    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
    }

    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file Error");

            return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredInstructors = data.members.filter(function(member) {
        return member.id != id
    }) 

    data.members = filteredInstructors
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) 
            return res.send("Write file error!")
            return res.redirect("/members")
    })

    
}