const express = require("express");
const { getUsersAPI, postCreateUserAPI, putUpdateUser, deleteUserAPI } = require("../controllers/apiController");
const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
    res.send('Hello apis');
});

routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUser);
routerAPI.delete('/users', deleteUserAPI);








module.exports = routerAPI;