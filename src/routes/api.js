const express = require("express");
const { getUsersAPI, postCreateUserAPI, putUpdateUser, deleteUserAPI, postUploadSingleFileAPi, postUploadMultipleFileAPi } = require("../controllers/apiController");
const { postCreateCustomer, postCreateArrayCustomer, getAllCustomers, putUpdateCustomer, deleteACustomer, deleteManyCustomer } = require("../controllers/customerController");
const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
    res.send('Hello apis');
});

routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUser);
routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/file', postUploadSingleFileAPi);
routerAPI.post('/files', postUploadMultipleFileAPi);


routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);
routerAPI.get('/customers', getAllCustomers);
routerAPI.put('/customers', putUpdateCustomer);
routerAPI.delete('/customers', deleteACustomer);
routerAPI.delete('/customers-many', deleteManyCustomer);






module.exports = routerAPI;