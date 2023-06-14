const express = require('express');
const userControler = require('../controlers/userControler');
const userRoute = express.Router();
userRoute
.route('/')
.get(userControler.getUsers)
.post(userControler.createUser)

module.exports = userRoute;