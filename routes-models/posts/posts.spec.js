const request = require('supertest')

const server = require('../../api/server')

const db = require('../../data/db-config.js')

describe('This is to verify we are testing', () => {
    beforeEach(async () => {
        await db('users').truncate();
        await db('subreddits').truncate();
        await db('posts').truncate();
        await request(server).post('/users/register').send({username: "Jest", password: "pass"})
    })
    it('makes sure we are testing in a test env', () => {
        expect(process.env.DB_ENV).toBe('test')
    })
})