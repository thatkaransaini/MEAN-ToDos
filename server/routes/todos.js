var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:root@ds127391.mlab.com:27391/root',['todos']);

// Get All Todos
router.get('/todos', function(req, res, next){
      res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    db.todos.find(function(err, todos){
        if(err){
           res.send(err); 
        } else {
            res.json(todos);
        }
    });
});

// Get Single Todo
router.get('/todo/:id', function(req, res, next){
	 res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo){
        if(err){
           res.send(err); 
        } else {
            res.json(todo);
        }
    });
});

// Save Todo
router.post('/todo', function(req, res, next){
	 res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    var todo = req.body;
    //console.log(todo);
    //todo.id = mongojs.ObjectId();
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', function(req, res, next){
	 res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    var todo = req.body;
    console.log(req.params.id);
    var updObj = {};
    
    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }
    
    if(todo.text){
        updObj.text = todo.text;
    }
    
    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/todo/:id', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result){
        if(err){
            res.send(err); 
        } else {
            res.json(result);
        }
    });
});

module.exports = router;