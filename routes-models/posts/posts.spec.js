const request = require('supertest')

const server = require('../../api/server')

const db = require('../../data/db-config.js')

describe('This is to set up our test environment', () => {
    beforeEach(async () => {
        await db('users').truncate();
        await db('subreddit').truncate();
        await db('posts').truncate();
        await request(server).post('/users/register').send({username: "Jest", password: "pass"})
        const login = await request(server).post('/users/login').send({username: "Jest", password: "pass"})
        await request(server).set('Authorization', login.body.token)
    })
})

describe('This is to verify we are logged on', () => {
    it('gets an OK and status code of 200', async () => {
        const response = await request(server).get('/post/')
        expect(response.status).toBe(200)
    })
    it('gets an array', async () => {
        await db('posts').truncate();
        const response = await request(server).get('/post/')
        expect(response.text).toBe('[]')
    })
})

describe('This is to add a new post', () => {
    it('gets a CREATED and status code of 201', async () => {
        await db('posts').truncate();
        const response = await request(server).post('/post/new').send({
            title: 'Test', 
            content: 'Test Content', 
            user_id: 1, 
            link: 0
        })
        expect(response.status).toBe(201)
    })
    it('gets an object?', async () => {
        await db('posts').truncate();
        const response = await request(server).post('/post/new').send({
            title: 'Test', 
            content: 'Test Content',
            user_id: 1, 
            link: 0
        })
        // console.log("Object?", response)
        // console.log("Object?", JSON.stringify(response.body))
        console.log("Body", )
        expect(response.body).toBe(JSON.stringify(`${"post:" [{
            id: 5, 
            title: 'Test', 
            content: 'Test Content', 
            user_id: 1, link: 0, 
            first: null, 
            first_subscribers: null, 
            first_description: null,
            second: null,
            second_subscribers: null,
            second_description: null,
            third: null,
            third_subscribers: null,
            third_description: null,
            subreddit_id: null}]}`))
    })
})