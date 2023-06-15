const express = require('express');
const groupRouter =  express.Router();
const groupControler = require('../controlers/groupControler');
groupRouter
.route('/')
.post(groupControler.createGroup)
.get(groupControler.getGroups)

groupRouter
.route('/:id')
.get(groupControler.getOneGroup)

module.exports = groupRouter;