require('dotenv').config()
const express = require('express')
const server = express()  //create instance of express server

const usersRouter = require('../routes-models/users/users-router')
const subRouter = require('../routes-models/subreddit/sub-router')
const postRouter = require('../routes-models/posts/posts-router')

const configureMiddleware = require('./api-middleware')
configureMiddleware(server)

server.use(express.json())// allows express to read .json from body of request

server.use('/users', usersRouter)
server.use('/subreddit', subRouter)
server.use('/post', postRouter)

server.get('/', (req, res) => { res.status(200).json({hello: 'Web 23'})})

module.exports = server;