/* RUSS */
// Added dotenv up here so we can use it!
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()  //create instance of express server


const usersRouter = require('../routes-models/users/users-router')
const subRouter = require('../routes-models/subreddit/sub-router')
const postRouter = require('../routes-models/posts/posts-router')

server.use(express.json()) // allows express to read .json from body of request
server.use(helmet())
server.use(cors())

server.use('/users', usersRouter)
server.use('/subreddit', subRouter)
server.use('/post', postRouter)

/* RUSS */
// I switched the get message to something that can be parsed by a web browser 
// This will aid us in hosting on Heroku (easier to check to see if the app is working)

server.get('/', (req, res) => { 
    const messageOfTheDay = process.env.MOTD || "Hello from the local server!"
    res.send(`<h1>${messageOfTheDay}</h1>`)
})

module.exports = server;