const User = require('../models/users');
const { uploadSingleFile, uploadmultipleFile } = require('../services/fileServie');

const getUsersAPI = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json({
        errCode: 0,
        data: results
    })
}

const postCreateUserAPI = async (req, res) => {
    console.log("body", req.body);

    // let {email, name, city} = req.body
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    let user = await User.create({
        email: email,
        name: name,
        city: city
    })
    return res.status(200).json({
        errCode: 0,
        data: user
    })
}


const putUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    // await updateUserById(email, city, name, userId);
    let user = await User.updateOne({ _id: userId }, { email: email, name: name, city: city });

    return res.status(200).json({
        errCode: 0,
        data: user
    })
}

const deleteUserAPI = async (req, res) => {
    let userId = req.body.userId;
    // await deleteUserById(userId);
    let user = await User.deleteOne({ _id: userId });

    return res.status(200).json({
        errCode: 0,
        data: user
    })
}

const postUploadSingleFileAPi = async (req, res) => {
    console.log('file: ', req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let result = await uploadSingleFile(req.files.image);
    return res.status(200).json({
        EC: 0,
        data: result
    })
}


const postUploadMultipleFileAPi = async (req, res) => {
    console.log('file: ', req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    if (Array.isArray(req.files.image)) {
        let result = await uploadmultipleFile(req.files.image)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
    else {
        return await postUploadSingleFileAPi(req, res);
    }
}
module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUser,
    deleteUserAPI,
    postUploadSingleFileAPi,
    postUploadMultipleFileAPi
}