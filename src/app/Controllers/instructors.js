const { age, date } = require('../../lib/utils');
const db = require('../../config/db');

module.expots = {
    index(req, res) {
        return 
    },
    create(req, res) {
        return 
    },
    show(req, res) {
        return 
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("please, fill the fields!")
            };
        };

        const query = `
                INSERT INTO instructors (
                    avatar_url,
                    name,
                    birth,
                    gender,
                    services,
                    created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, )
                RETURNING id
        `

        const value = [
            req.body.avatar_url,
            req.body.name,
            req.body.gender,
            data(req.body.birth).iso,
            req.body.services,
            data(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) 
            return res.send("Data Error!");
            console.log(err);
            return res.redirect(`/instructors/${results.rows[0].id}`);
            console.log(results);
        });
    },
    edit(req, res) {
        return 
    },
    put(req, res) {
         return
    },
    delete (req, res) {
            return 
        
    },  
};
