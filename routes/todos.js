var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../helpers/todos');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.postTodos);

router.route('/:todoId')
    .get(helpers.showTodos)
    .put(helpers.updateTodos)
    .delete( helpers.deleteTodos);


module.exports = router;