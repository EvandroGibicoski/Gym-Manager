const { date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render("members/index", { members: data.members });
    },
    show(req, res) {
        const { id } = req.params;
    
    const foundMember = data.members.find(function(member) {
       return member.id == id;
    });
        if(!foundMember)
            return res.send("Member not found!");

        const member = {
            ...foundMember,
            birth: date(foundMember.birth).birthDay,
            gender: foundMember.gender,
            blood: foundMember.blood,

        };
            return res.render("members/show", { member });
    },
    create(req, res) {
        return res.render('members/create');
    },
    post(req, res) {
        const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill the fields!")
        };
    };
    
    

    birth = Date.parse(req.body.birth);

    let id = 1;
    const lastMember = data.members[data.members.length - 1];
        if(lastMember){
            id = lastMember.id + 1;
        };

    data.members.push({
        ...req.body,
        id,
        birth,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) 
        return res.send("write file error!");
        return res.redirect("/members");
    });
    },
    edit(req, res) {
        const { id } = req.params;
    
        const foundMember = data.members.find(function(member) {
           return member.id == id;
        });
            if(!foundMember)
                return res.send("Member not found!");
        
                const member = {
                    ...foundMember,
                    birth: date(foundMember.birth).iso
                };
    
                return res.render("members/edit", { member });
    },
    put(req, res) {
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
        };
    
        data.members[index] = member;
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if(err) return res.send("Write file Error");
    
                return res.redirect(`/members/${id}`)
        });
    },
    delete(req, res) {
        const { id } = req.body;

    const filteredInstructors = data.members.filter(function(member) {
        return member.id != id
    });

    data.members = filteredInstructors;
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) 
            return res.send("Write file error!");
            return res.redirect("/members");
    });
    }
};
