const {fetchData} = require("../../medium/fetchData");
const {getUserData}=require("../../medium/user");

jest.mock('../../medium/fetchData');

test('returns user data for a given userId', async () => {
    const data = { id: 1, name: 'John Doe' };
    fetchData.mockResolvedValue(data);

    const result = await getUserData(1);
    expect(result).toEqual(data);
    expect(fetchData).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
});