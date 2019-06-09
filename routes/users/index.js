const express = require('express');
const UsersController = require('./UsersController');

const router = express.Router();

/* GET users listing */
router.get('/users', UsersController.getAllUsers);
/* GET user */
router.get('/users/:id', UsersController.getUser);
/* POST user */
router.post('/users', UsersController.createUser);
/* PUT user */
router.put('/users/:id', UsersController.updateUser);
/* DELETE user */
router.delete('/users/:id', UsersController.destroyUser);

module.exports = router;
