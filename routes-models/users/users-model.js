//connection to database
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
    return db('users')
    .insert(user)
    .then(() => {
        return db('users')
        .where('username', '=', user.username)
    })
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