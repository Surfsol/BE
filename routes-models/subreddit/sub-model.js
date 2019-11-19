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
    return db('subreddit').select('id', 'title');
  }

// async function add(sub){
//     const[id] = await db('subreddit').insert(sub)

//     return findById(id)
// }

function add(sub){
    if (process.env.DB_ENV == 'production') {
        console.log('hitting production')
        return db('subreddit')
        .insert(sub)
        .returning('id')
        .then(ids => {
            const [id] = ids
            return db('subreddit')
            .where({id})
            .first()
    })        
} else {
    console.log('hitting development')
    return db('subreddit')
    .insert(sub)
    .then(ids => {
        const [id] = ids
        return db('subreddit')
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
    return db('subreddit')
        .where({id})
        .first()
}

function findBy(filter){
    return db('subreddit').where(filter)
}