const { getAllUser, getUserById, updateUserById, deleteUserById } = require('../services/CRUDservice');
const connection = require('../config/database');


const getHomePage = async (req, res) => {
    let results = await getAllUser();
    return res.render('homepage.ejs', { listUsers: results })
}

const getTest = (req, res) => {

}

const postCreateUser = async (req, res) => {
    console.log("body", req.body);

    // let {email, name, city} = req.body
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    // connection.query(
    //     ` INSERT INTO Users (email, name, city)
    //     VALUES (?, ?, ?) `,
    //     [email, name, city],
    //     function (err, results) {
    //         res.send('create new user succeed');
    //     }

    // );



    let [results, fields] = await connection.query(
        `INSERT INTO Users (email, name, city) VALUES (?, ?, ?) `, [email, name, city]
    );

    console.log(">>>>>>>>.check ", results);

    // const [results, fields] = await connection.query('select * from Users u');
    // console.log(">>check users", results);
}

const getCreateUser = (req, res) => {
    res.render('create.ejs')

}

const getUpdateUser = async (req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    res.render('edit.ejs', { userEdit: user });

}



const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    await updateUserById(email, city, name, userId);

    res.redirect('/');
}


const postDeleteUser = async (req, res) => {
    let userId = req.params.id;
    let user = await getUserById(userId);
    res.render('delete.ejs', { userDelete: user });
}

const postHandleDeleteUser = async (req, res) => {
    let userId = req.body.userId;
    await deleteUserById(userId);
    res.redirect('/');
}

module.exports = {
    getHomePage,
    getTest,
    postCreateUser,
    getCreateUser,
    getUpdateUser,
    postUpdateUser,
    postDeleteUser,
    postHandleDeleteUser
}