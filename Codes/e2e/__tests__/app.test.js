const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterEach(async () => {
    await User.deleteMany(); // Clear test data after each test
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User API E2E Tests', () => {
    test('POST /users - should create a new user', async () => {
        const newUser = { name: 'John Doe', email: 'john@example.com' };

        const response = await request(app).post('/users').send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
    });

    test('GET /users - should retrieve all users', async () => {
        const users = [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Doe', email: 'jane@example.com' }
        ];

        await User.insertMany(users);

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[1].name).toBe(users[1].name);
    });

    test('GET /users/:id - should retrieve a user by ID', async () => {
        const user = new User({ name: 'Alice', email: 'alice@example.com' });
        await user.save();

        const response = await request(app).get(`/users/${user._id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(user.name);
        expect(response.body.email).toBe(user.email);
    });

    test('GET /users/:id - should return 404 if user not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();

        const response = await request(app).get(`/users/${fakeId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });
});
