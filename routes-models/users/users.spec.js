const request = require('supertest')

const server = require('../../api/server')

const db = require('../../data/db-config.js')

describe('This is to verify we are testing', () => {
    beforeEach(async () => {
        await db('users').truncate();
        await request(server).post('/users/register').send({username: "Test", password: "pass"})
    })
    it('makes sure we are testing in a test env', () => {
        expect(process.env.DB_TEST).toBe('test')
    })
})

describe('This is to test the user registration and login', () => {
    describe('testing the registration', () => {
        it('should return a CREATED status code of 201', async () => {
            const response = await request(server).post('/users/register').send({username: "TestMack", password: "pass"})
            expect(response.status).toBe(201)
        })
        it('should return a piece of JSON', async () => {
            const response = await request(server).post('/users/register').send({username: "TestMack1", password: "pass"})
            expect(response.type).toMatch(/json/i)
        })
        it('should return an object with properties', async () => {
            const response = await request(server).post('/users/register').send({username: "TestMack2", password: "pass"})
            expect(response.body).toHaveProperty('newUser')
            expect(response.body).toHaveProperty('token')
        })
    })
    describe('testing the login', () => {
        it('should return an OK status of 200', async () => {
            const response = await request(server).post('/users/login').send({username: "Test", password: "pass"})
            expect(response.status).toBe(200)
        })
        it('should return a piece of JSON', async () => {
            const response = await request(server).post('/users/login').send({username: "Test", password: "pass"})
            expect(response.type).toMatch(/json/i)
        })
        it('should return an object with properties', async () => {
            const response = await request(server).post('/users/login').send({username: "Test", password: "pass"})
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('token')
        })
    })
})

describe('This is to test getting all users', () => {
    it('should return a status of 200', async () => {
        const login = await request(server).post('/users/login').send({username: "Test", password: "pass"})
        const response = await request(server).get('/users/').set('Authorization', login.body.token)
        expect(response.status).toBe(200)
    })
})
