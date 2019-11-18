const express = require('express')
const server = express()  //create instance of express server

const usersRouter = require('../users/users-router')
// const catRouter = require('../routes/category-router')
// const subRouter = require('../routes/sub-router')
// const postRouter = require('../routes/posts-router')

const configureMiddleware = require('./api-middleware')
configureMiddleware(server)

server.use(express.json())// allows express to read .json from body of request

server.use('/users', usersRouter)
// server.use('/category', catRouter)
// server.use('/subreddit', subRouter)
// server.use('/post', postRouter)

/* RUSS */
// I switched the get message to something that can be parsed by a web browser 
// This will aid us in hosting on Heroku (easier to check to see if the app is working)

server.get('/', (req, res) => { res.status(200).json({hello: 'Web 23'})})

module.exports = server;