const app = require('./app');
const mongoose = require('mongoose');

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.error(error));
