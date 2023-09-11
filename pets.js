const client = require('../db/db')
const express = require('express');
const router = express.Router();

router.get('/watchPatients', getAllPets);
router.get('/byuser/:phonenumber', getAllPetsByUser);
router.get('/petbyuser/:phonenumber/:petname', getPet);
router.post('/petRegister', addPet);
router.get('/updateStatus/:phonenumber/:petname', UpdatePetStatus);

async function getAllPets(req, response) {

    let sql = 'select * from pets';

    client.query(sql, [], (err, res) => {
        if (!err) {
            let array = [];
            res.rows.map((get) => {
                let obj = { name: get.name, breed: get.breed, gender: get.gender, type: get.type, birthday: get.birthday.toLocaleDateString('he-IL').split('').join(''), status: get.status }
                array.push(obj)
            })
            return response.status(200).json(array);
        } else {
            console.log(err);
            response.status(400).json({ message: "Error" });
        }
    });

}

async function getAllPetsByUser(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.params.phonenumber]);
    if (user.rows.length == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let sql = 'select * from pets where owner_id=$1';

    client.query(sql, [user.rows[0].id], (err, res) => {
        if (!err) {
            response.json(res.rows)
        } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
        }
    });
}

async function getPet(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.params.phonenumber]);
    if (user.rows.length == 0) {
        return response.status(400).json({ message: "user is not found" });
    }
    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.params.petname]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not found" });
    }

    let sql = 'select * from pets where owner_id=$1 AND name=$2';

    client.query(sql, [user.rows[0].id, req.params.petname], (err, res) => {
        if (!err) {
            response.status(200).json(res.rows)
        } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
        }
    });


}

async function addPet(req, response) {

    _petObj = req.body;

    let user = await client.query("select * from users where phone_number=$1", [req.body.phone_number]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.body.name]);
    if (userpets.rowCount > 0) {
        return response.status(400).json({ message: "pet is exist" });
    }

    let sql = `INSERT INTO pets(name, breed, chip_number, owner_id, birthday, gender, type) 
            VALUES($1, $2, $3, $4, $5, $6, $7)`;

    let values = [
        _petObj.name,
        _petObj.breed,
        _petObj.chip_number,
        user.rows[0].id,
        _petObj.birthday,
        _petObj.gender,
        _petObj.type
    ];

    client.query(sql, values, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "Something went wrong" });
        } else {
            if (res.rowCount > 0) {
                return response.status(200).json({ message: "New pet created successfully" });
            } else {
                return response.status(400).json({ message: "Something went wrong" });
            }
        }
    });

}

async function UpdatePetStatus(req, response) {

    let user = await client.query("select * from users where phone_number=$1", [req.params.phonenumber]);
    if (user.rowCount == 0) {
        return response.status(400).json({ message: "user is not found" });
    }

    let userpets = await client.query('select * from pets where owner_id=$1 AND name=$2', [user.rows[0].id, req.params.petname]);
    if (userpets.rowCount == 0) {
        return response.status(400).json({ message: "pet is not exist" });
    }
    let sql = "UPDATE pets SET status=$1 where owner_id=$2 AND name=$3";
    let val = [false, user.rows[0].id, req.params.petname]
    client.query(sql, val, (err, res) => {
        if (err) {
            response.status(400).json({ message: "Something went wrong" });
        } else {
            response.status(200).json({ message: "update successfully!" });
        }
    });


}

// router.get('/pets', (req, res) => {
//     let allpets = []
//     for (let i = 0; i < pets.length; i++) {
//         if (pets[i].owner == req.body.owner) {
//             if (pets[i].type == req.body.type) {
//                 allpets.push(pets[i])
//             }
//         }
//     }
//     res.status(200).contentType('application/json').json({
//         "data": allpets
//     })
// })


router.post('/findPetIdByName', (req, response) => {
    client.query(`SELECT id FROM pets WHERE name=$1 AND owner_id=$2`, [req.body.pname, req.body.ownerId],
        (err, res) => {
            if (err) {
                response.status(400).contentType('application/json').json({
                    "message": "not found!"
                })
            }
            else {
                try {
                    if (res.rows[0]) {
                        console.log("owner: ", req.body.ownerId);
                        console.log(res);
                        console.log(res.rows[0]);
                        response.status(200).contentType('application/json').json({
                            "message": "ok!",
                            "data": res.rows[0].id
                        })
                    }
                }
                catch {
                    response.status(400).contentType('application/json').json({
                        "message": "not found!"
                    })
                }

            }
        })
})



module.exports = router;
