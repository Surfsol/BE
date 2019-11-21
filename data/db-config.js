require('dotenv').config()

const knex = require('knex')

const config = require('../knexfile')

// const knexConfig = (item) => {
//     knex(config[item])
// }

// module.exports = knex(config[process.env.DB_ENV || 'development'])

// module.exports = knexConfig = (item) => {
//     knex(config[item])
// }

module.exports = knex(config[process.env.DB_ENV == 'test' ? 'testing' : process.env.DB_ENV || 'development'])