To build end-to-end (E2E) tests for an Express REST API with Jest and MongoDB, we’ll create a sample API with basic CRUD operations for managing users. We'll write E2E tests to verify these operations using Jest and Supertest.

**Prerequisites**

Ensure you have the following dependencies installed:

    npm install express mongoose jest supertest mongodb-memory-server

_**Express**: For building the REST API.\
**Mongoose**: For interacting with MongoDB.\
**Jest**: For running tests.\
**Supertest**: For testing HTTP requests.\
**mongodb-memory-server**: An in-memory MongoDB server for tests, so that you don’t need a real MongoDB instance._

**Step 1: Setting Up the Express API with MongoDB**\
Create the following structure:

markdown
Copy code
project/\
├── app.js\
├── models/\
│   └── user.js\
├── routes/\
│   └── users.js\
├── __tests__/\
│   └── app.test.js\
└── server.js

Create the User Model (models/user.js)
Create the User Routes (routes/users.js)
Create the Express Application (app.js)
Create the Server (server.js)

**Step 2: Write E2E Tests for the API**

Create the E2E test file (__tests__/app.test.js)

**Explanation of Tests**
Setup and Teardown:

_**beforeAll**: Connects to an in-memory MongoDB instance for testing.\
**afterEach**: Clears the database after each test to avoid data conflicts.\
**afterAll**: Disconnects from MongoDB and stops the in-memory server after all tests are complete._

**Tests:**

    POST /users: Verifies that a user can be created and that the response includes the expected fields.
    GET /users: Checks that all users can be retrieved, validating the response array’s length and contents.
    GET /users/: Tests retrieving a user by ID and verifies the response matches the saved user.
    GET /users/(404): Verifies that the correct error is returned when trying to fetch a non-existent user.

**Step 3: Run the Tests**\
    Run the tests with Jest:

    npm test