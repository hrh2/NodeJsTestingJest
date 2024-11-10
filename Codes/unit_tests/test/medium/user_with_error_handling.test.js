const {getUserData} = require('../../medium/user_with_error_handling');
const {fetchData} = require("../../medium/fetchData");

jest.mock('../../medium/fetchData');


test('handles errors when fetching user data', async () => {
    fetchData.mockRejectedValue(new Error('Network Error'));

    try {
        await getUserData(1);
    } catch (e) {
        expect(e.message).toBe('Unable to fetch user data');
    }
});
