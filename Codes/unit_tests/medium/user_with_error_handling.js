const {fetchData} = require('../medium/fetchData');

async function getUserData(userId) {
    try {
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        const data = await fetchData(url);
        return data;
    } catch (error) {
        throw new Error('Unable to fetch user data');
    }
}

module.exports = {getUserData};