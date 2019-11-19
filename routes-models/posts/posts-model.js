//connection to database
require('dotenv').config()
const db = require('../../data/db-config')

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove

}

function find() {
    return db('posts').select('id', 'title', 'content', 'user_id');
  }

// async function add(post){
//     const[id] = await db('posts').insert(post)

//     return findById(id)
// }

function add(post){
    if (process.env.DB_ENV == 'production') {
        console.log('hitting production')
        return db('posts')
        .insert(post)
        .returning("id")
        .then(ids => {
            const [id] = ids 
            return db('posts')
            .where({id})
        })
    } else {
        console.log('hitting development')
        return db('posts')
        .insert(post)
        .then(ids => {
            const [id] = ids 
            return db('posts')
            .where({id})
        })
    }




    // .then(ids => {
    //     console.log("This is the ids console log", ids)
    //     const [id] = ids
        // return db('posts')
        // .where('id', '=', id)
    // })
    // .then(ids => {
    //     const [id] = ids;
    //     return db('users')
    //     .where({id})
    // })
}

function findById(id){
    return db('posts')
        .where({id})
        .first()
}

function findBy(filter){
    return db('posts').where(filter)
}

function update(change, id){
    return db('posts')
    .update(change)
    .where({id: id})
    //resolve to count records updated
}

function remove(id){
    return db('posts')
    .delete(id)
    .where({id: id})
}