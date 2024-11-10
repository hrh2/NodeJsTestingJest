const axios = require('axios');

async function fetchData(url) {
    const response = await axios.get(url);
    return response.data;
}

module.exports = {fetchData};