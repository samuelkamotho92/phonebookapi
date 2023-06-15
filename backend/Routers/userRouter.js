const express = require('express');
const userControler = require('../controlers/userControler');
const userRoute = express.Router();
userRoute
.route('/')
.get(userControler.getUsers)
.post(userControler.createUser)

userRoute.route('/:id')
.get(userControler.getUser)
.delete(userControler.deleteUser)

userRoute.route('/useGroup/:id')
.get(userControler.getUsersGroup)

module.exports = userRoute;