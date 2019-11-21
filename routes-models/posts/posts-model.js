//connection to database
require('dotenv').config()
const db = require('../../data/db-config')

module.exports = {
    add,
    find,
    findBy,
    findById,
    findPostById,
    update,
    remove
}

function find() {
    return db('posts');
}

function add(post){
    if (process.env.DB_ENV == 'production') {
        return db('posts')
        .insert(post)
        .returning('id')
        .then(ids => {
            const [id] = ids 
            return db('posts')
            .where({id})
            .first()
        })
    } else {
        return db('posts')
        .insert(post)
        .then(ids => {
            const [id] = ids 
            return db('posts')
            .where({id})
        })
    }
}

function findById(id){
    return db('posts')
        .where("user_id", "=", id)
}

function findPostById(id) {
    return db('posts')
    .where({id})
}

function findBy(filter){
    return db('posts').where(filter)
}

function update(changes, id){
    return db('posts')
    .update(changes)
    .where({id})
}

function remove(id){
    return db('posts')
    .where({id})
    .first()
    .delete()
}