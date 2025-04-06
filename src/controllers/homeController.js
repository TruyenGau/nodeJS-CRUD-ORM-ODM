const { getAllUser, getUserById, updateUserById, deleteUserById } = require('../services/CRUDservice');
const connection = require('../config/database');
const User = require('../models/users');

const getHomePage = async (req, res) => {
    let results = await User.find({});
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

    await User.create({
        email: email,
        name: name,
        city: city
    })
    // console.log(">>>>>>>>.check ", results);

    res.redirect('/');
}

const getCreateUser = (req, res) => {
    res.render('create.ejs')

}

const getUpdateUser = async (req, res) => {
    let userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render('edit.ejs', { userEdit: user });

}



const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    // await updateUserById(email, city, name, userId);
    await User.updateOne({ _id: userId }, { email: email, name: name, city: city });

    res.redirect('/');
}


const postDeleteUser = async (req, res) => {
    let userId = req.params.id;
    let user = await User.findById(userId).exec();
    res.render('delete.ejs', { userDelete: user });
}

const postHandleDeleteUser = async (req, res) => {
    let userId = req.body.userId;
    // await deleteUserById(userId);
    await User.deleteOne({ _id: userId });
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