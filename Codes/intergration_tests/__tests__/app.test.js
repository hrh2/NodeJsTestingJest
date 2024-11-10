const request = require('supertest');
const app = require('../medium/app');

describe('User API Integration Tests', () => {
    test('should create a new user', async () => {
        const newUser = { name: 'Alice', email: 'alice@example.com' };
        const response = await request(app).post('/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
    });

    test('should retrieve a user by ID', async () => {
        // First, create a new user
        const newUser = { name: 'Bob', email: 'bob@example.com' };
        const createResponse = await request(app).post('/users').send(newUser);
        const userId = createResponse.body.id;

        // Now, retrieve the user
        const getResponse = await request(app).get(`/users/${userId}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toHaveProperty('id', userId);
        expect(getResponse.body.name).toBe(newUser.name);
        expect(getResponse.body.email).toBe(newUser.email);
    });

    test('should return 404 if user is not found', async () => {
        const response = await request(app).get('/users/9999'); // Nonexistent ID
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });
});
