//connection to database
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

async function add(sub){
    const[id] = await db('subreddit').insert(sub)

    return findById(id)
}

function findById(id){
    return db('subreddit')
        .where({id})
        .first()
}

function findBy(filter){
    return db('subreddit').where(filter)
}