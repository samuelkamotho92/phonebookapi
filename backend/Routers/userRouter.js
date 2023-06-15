const express = require('express');
const userControler = require('../controlers/userControler');
const verifyTokenontroler = require('../utlity/verifyToken');
const userRoute = express.Router();
userRoute
.route('/')
.get(verifyTokenontroler.verifyToken, userControler.getUsers)
.post(userControler.createUser)

userRoute.route('/:id')
.get(userControler.getUser)
.delete(userControler.deleteUser)

userRoute
.route('/login')
.post(userControler.loginUser)

userRoute.route('/useGroup/:id')
.get(userControler.getUsersGroup)

module.exports = userRoute;