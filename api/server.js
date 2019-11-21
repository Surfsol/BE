/* RUSS */
// Added dotenv up here so we can use it!
const express = require('express')
const server = express()  //create instance of express server

const usersRouter = require('../routes-models/users/users-router')
const subRouter = require('../routes-models/subreddit/sub-router')
const postRouter = require('../routes-models/posts/posts-router')
const flaskRouter = require('../routes-models/ds/flask-router')

const configureMiddleware = require('./api-middleware')
configureMiddleware(server)

server.use(express.json())// allows express to read .json from body of request

server.use('/users', usersRouter)
server.use('/subreddit', subRouter)
server.use('/post', postRouter)
server.use('/ds', flaskRouter)

/* RUSS */
// I switched the get message to something that can be parsed by a web browser 
// This will aid us in hosting on Heroku (easier to check to see if the app is working)

server.get('/', (req, res) => { 
    const messageOfTheDay = process.env.MOTD || "Hello from the local server!"
    res.send(`<h1>${messageOfTheDay}</h1>`)
})

module.exports = server;