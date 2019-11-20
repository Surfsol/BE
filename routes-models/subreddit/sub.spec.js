const request = require('supertest')

const server = require('../../api/server')

const db = require('../../data/db-config.js')

describe('This is to verify we are testing', () => {
    beforeEach(async () => {
        await db('users').truncate();
        await request(server).post('/users/register').send({username: "Jest", password: "pass"})
    })
    it('makes sure we are testing in a test env', () => {
        expect(process.env.DB_ENV).toBe('test')
    })
})

describe('This is testing the subreddit route', () => {
    describe('This gets all of the subreddits', () => {
        it('gets a response status of 200', async () => {
            const login = await request(server).post('/users/login').send({username: "Jest", password: "pass"})
            const response = await request(server).get('/subreddit').set('Authorization', login.body.token)
            expect(response.status).toBe(200)
        })
        it('should return a piece of JSON', async () => {
            const login = await request(server).post('/users/login').send({username: "Jest", password: "pass"})
            const response = await request(server).get('/subreddit').set('Authorization', login.body.token)
            expect(response.body.isArray).toBe(true)
            // expect(response.body).toHaveProperty('id')
            // expect(response.body).toHaveProperty('title')
        })
    })
})