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

function add(sub){
    if (process.env.DB_ENV == 'production') {
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