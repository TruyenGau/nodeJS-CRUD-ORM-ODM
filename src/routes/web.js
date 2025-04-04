const express = require("express");
const { getHomePage, getTest, postCreateUser, getCreateUser, getUpdateUser, postUpdateUser, postDeleteUser, postHandleDeleteUser } = require('../controllers/homeController')
const router = express.Router();

router.get('/', getHomePage);
router.get('/abc', getTest);

router.post('/create-user', postCreateUser);
router.get('/create', getCreateUser);

router.get('/update/:id', getUpdateUser);
router.post('/update-user', postUpdateUser);

router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postHandleDeleteUser);



module.exports = router;