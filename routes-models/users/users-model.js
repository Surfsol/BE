//connection to database
require('dotenv').config()
const db = require('../../data/db-config')

module.exports = {
    add,
    find,
    findBy,
    findById

}

function find() {
    return db('users').select('id', 'username');
  }

function add(user){
    if (process.env.DB_ENV == 'production') {
        console.log('hitting production')
        return db('users')
        .insert(user)
        .returning('id')
        .then(ids => {
            const [id] = ids
            return db('users')
            .where({id})
            .first()
        })
    } else {
        console.log('hitting development')
        return db('users')
        .insert(user)
        .then(ids => {
            const [id] = ids
            return db('users')
            .where({id})
            .first()
        })
    }
    // .then(ids => {
    //     const [id] = ids;
    //     return db('users')
    //     .where({id})
    // })
}

function findById(id){
    return db('users')
        .where({id})
        .first()
}

function findBy(filter){
    return db('users').where(filter)
}