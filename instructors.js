const fs = require('fs');
const data = require('./data.json');

exports.show = function(req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor) {
       return instructor.id == id;
    });
    
        if(!foundInstructor)
            return res.send("Instructor not found!")

        const instructor = {
            ...foundInstructor,
            age: "",
            gender: "",
            services: foundInstructor.services.split(""),
            created_at: ""

        }
            return res.render("instructors/show", { instructor: foundInstructor })
    
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("please, fill the fields!")
        }
    }
    
    let { avatar_url, name, birth, gender, service} = req.body;

    const created_at = Date.now();
    const id = Number(data.instructors.length +1);

    birth = Date.parse(birth);

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) 
        return res.send("write file error!");
        return res.redirect("/instructors");
    });

};


