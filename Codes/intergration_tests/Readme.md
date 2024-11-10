Here’s a step-by-step guide with an example using Node.js, Express, Jest, and Supertest.

**Scenario**

Let's create a simple API for managing users, with endpoints to:

Create a new user
Retrieve a user by ID
Step 1: Setting up the Project
Initialize the Project

    mkdir integration-test-example
    cd integration-test-example
    npm init -y
    npm install express jest supertest sqlite3
Express: Web framework for Node.js\
Jest: Testing framework\
Supertest: Library for testing HTTP endpoints\
sqlite3: Database for storing user data
Configure Jest\
In package.json, add the following under scripts:

    "scripts": {
        "test": "jest"
    }
Step 2: Create the Application
Create an Express App
Create a file app.js:

    const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const app = express();

    app.use(express.json());

    // Setup in-memory database
    const db = new sqlite3.Database(':memory:');
    db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");
    });

    // Endpoint to create a user
    app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
    });
    });

    // Endpoint to retrieve a user by ID
    app.get('/users/:id', (req, res) => {
    db.get("SELECT * FROM users WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "User not found" });
    res.json(row);
    });
    });

    module.exports = app;

Create a Server File
Create server.js to run the app:
    
    const app = require('./app');
    const PORT = 3000;
    
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
**Step 3: Write Integration Tests**

Set Up Jest for Integration Testing
Create a folder \__tests\__ and inside it a file app.test.js:


    const request = require('supertest');
    const app = require('../app');
    
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
    

**Run the Tests**
Run the following command to execute your integration tests:

    npm test

**Explanation of the Tests**

**User Creation Test**: This test sends a POST request to /users with a JSON payload. It expects a 201 status code and checks if the response includes the id, name, and email properties, verifying that the user creation process works.

**User Retrieval Test**: This test creates a user and then retrieves it using a GET request to /users/:id. It checks that the response status is 200 and that the response body contains the correct user data.

**User Not Found Test**: This test attempts to retrieve a user by an ID that doesn't exist in the database, expecting a 404 status and an error message in the response.

**Quick Start**

**1. Clone the repository:**

    git clone https://github.com/hrh2/NodeJsTestingJest.git
    cd NodeJsTestingJest/Codes/intergration_tests



**2. Install packages**

    npm install

Testing
Integration tests  . To run the tests, use the following command:

    npm  test