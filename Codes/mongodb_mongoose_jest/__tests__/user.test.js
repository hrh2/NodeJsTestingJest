const mongoose = require('mongoose');
const User = require('../models/User');
const { connect, close, clearDatabase } = require('../test-setup');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await close();
});

describe('User Model Test Suite', () => {
    it('should create & save a user successfully', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', age: 30 };
        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.age).toBe(userData.age);
    });

    it('should fail to create a user without required fields', async () => {
        const user = new User({ age: 25 });

        let err;
        try {
            await user.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.name).toBeDefined();
        expect(err.errors.email).toBeDefined();
    });

    it('should update a user successfully', async () => {
        const user = await User.create({ name: 'Jane Doe', email: 'jane@example.com' });
        user.name = 'Jane Smith';
        const updatedUser = await user.save();

        expect(updatedUser.name).toBe('Jane Smith');
    });

    it('should delete a user successfully', async () => {
        // Create a user first
        const user = await User.create({ name: 'Mark Doe', email: 'mark@example.com' });

        // Use deleteOne() to remove the user
        await User.deleteOne({ _id: user._id });

        // Verify the user is deleted by trying to find them
        const foundUser = await User.findById(user._id);
        expect(foundUser).toBeNull();
    });

});
