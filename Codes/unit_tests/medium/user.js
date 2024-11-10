const {fetchData} = require("./fetchData");

async function getUserData(userId) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    return await fetchData(url);
}

module.exports = {getUserData};