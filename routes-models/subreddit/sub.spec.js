const request = require('supertest')

const server = require('../../api/server')

const db = require('../../data/db-config.js')

describe('This is to set up our test environment', () => {
    beforeEach(async () => {
        await db('users').truncate();
        await db('subreddit').truncate();
        await db('posts').truncate();
        await request(server).post('/users/register').send({username: "Jest", password: "pass"})
        // const login = await request(server).post('/users/login').send({username: "Jest", password: "pass"})
        // await request(server).set('Authorization', login.body.token)
    })
})

describe('This is testing the subreddit route', () => {
    describe('This gets all of the subreddits', () => {
        it('gets a response status of 200', async () => {
            await request(server).post('/users/register').send({username: "Jest", password: "pass"})
            const login = await request(server).post('/users/login').send({username: "Jest", password: "pass"})
            const response = await request(server).get('/subreddit/').set('Authorization', login.body.token)
            expect(response.status).toBe(200)
        })
        it('should return an array', async () => {
            await request(server).post('/users/register').send({username: "Jest", password: "pass"})
            const login = await request(server).post('/users/login').send({username: "Jest", password: "pass"})
            const response = await request(server).get('/subreddit/').set('Authorization', login.body.token)
            expect(JSON.stringify(response.body)).toMatch(`${[]}`)
        })
        it('should return a piece of JSON', async () => {
            await request(server).post('/users/register').send({username: "Jest", password: "pass"})
            const login = await request(server).post('/users/login').send({username: "Jest", password: "pass"})
            const response = await request(server).get('/subreddit/').set('Authorization', login.body.token)
            expect(response.type).toMatch(/json/i)
        })
    })
})