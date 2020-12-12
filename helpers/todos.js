var db = require ('../models');

exports.getTodos = (req, res)=>{
    db.Todo.find()
    .then((todos)=>{
        res.json(todos);
    })
    .catch((err)=>{
        res.send(err);
    })
};


exports.postTodos = (req, res)=>{
    db.Todo.create(req.body)
    .then((newTodo)=>{
        res.status(201).json(newTodo);
    })
    .catch((err)=>{
        res.send(err);
    })
};

exports.showTodos = (req, res)=>{
    db.Todo.findById(req.params.todoId)
    .then((foundTodo)=>{
        res.json(foundTodo);
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.updateTodos = (req,res)=>{
    db.Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true})
    .then((foundTodo)=>{
        res.send(foundTodo);
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.deleteTodos = (req,res)=>{
    db.Todo.findByIdAndDelete(req.params.todoId)
    .then((data)=>{
        res.send("deleted successfuly");
    })
    .catch((err)=>{
        res.send(err);
    })
}

module.exports = exports;