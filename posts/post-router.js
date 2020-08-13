//STEP npm i knex sqlite3
//STEP 2 on db-config file, set up initial code to import knex
//STEP 3 on this file, we are writing the code to access the data and get it to appear on our API

const express = require('express');

// database access using knex
const db = require('../data/db-config.js');
// db is the connection to the database

const router = express.Router();

router.get('/', (req, res) => {
    //respond with a list of posts from the database
    //select * from posts;
    //db('posts') //alternative code shortucut to select * from posts
    db.select('*')
        .from('posts')
        .then(posts => {
            res.status(200).json({ data: posts })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message})
        })
});

router.get('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .then(post => {
        res.status(200).json({ data: post });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message});
    })
});

router.post('/', (req, res) => {
    const post = req.body;
    db('posts')
        .insert(post)
        .returning('id') //do not forget this line if you plan to support PostgreSQL
        .then(ids => {
            //the warning: .returning() is not supported by sqlite3 and will not have any effect.
            //can be safely ignored with using SQLite because it will go away when using PostgreSQL
            res.status(201).json({ insert: ids })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message})
        });
});
//you always get the LAST ID wrapped into an array returned to you in postman
//even if you insert 100 things, the thing you get back will be 1 ID, the ID of the last ID inserted.

router.put('/:id', (req, res) => {
    const changes = req.body;
    const postId = req.params.id;
    //where the id is equal to id
    db('posts')
        .where({ id: postId })
        //// .where("id", "=", postId) //another way to write the where
        .update(changes)
        .then(count => {
            if(count) {
                res.status(200).json({ message: "updated successfully" });
            } else {
                res.status(404).json({ message: "not found" })
            }
        }).catch(error => {
            console.log(error)
            res.status(500).json({ error: error.message })
        })
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    //where id = id
    db('posts')
        .where({ id: postId })
        .del() // delete instead of update
        .then(count => {
            if(count) {
                res.status(200).json({ message: "removed successfully"});
            } else {
                res.status(404).json({ message: "not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;