const User = require('../models/User');
const userService = require('../services/userService');

jest.mock('../models/User'); // Mock the entire User model

describe('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('findUserById', () => {
        test('should return a user by ID', async () => {
            const fakeUser = { _id: '1', name: 'John Doe', email: 'john@example.com' };

            // Mock User.findById to resolve with fakeUser
            User.findById.mockResolvedValue(fakeUser);

            const user = await userService.findUserById('1');

            expect(User.findById).toHaveBeenCalledWith('1');
            expect(user).toEqual(fakeUser);
        });

        test('should return null if user is not found', async () => {
            // Mock User.findById to resolve with null
            User.findById.mockResolvedValue(null);

            const user = await userService.findUserById('nonexistent-id');

            expect(User.findById).toHaveBeenCalledWith('nonexistent-id');
            expect(user).toBeNull();
        });
    });

    describe('createUser', () => {
        test('should create and save a new user', async () => {
            const fakeUserData = { name: 'Jane Doe', email: 'jane@example.com' };
            const fakeUserResponse = { _id: '2', ...fakeUserData };

            // Create a mock for the save method and for the User constructor
            const saveMock = jest.fn().mockResolvedValue(fakeUserResponse);
            User.mockImplementation(() => ({
                save: saveMock, // mock the save method
            }));

            const user = await userService.createUser(fakeUserData);

            expect(User).toHaveBeenCalledWith(fakeUserData); // Check if User was called with the correct data
            expect(user).toEqual(fakeUserResponse); // Validate the response
            expect(saveMock).toHaveBeenCalled(); // Check if save was called on the mock instance
        });
    });
});
