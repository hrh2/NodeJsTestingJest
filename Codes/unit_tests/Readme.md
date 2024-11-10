**What is Jest?**\
Jest is a delightful JavaScript testing framework with a focus on simplicity. It provides an out-of-the-box experience, offering features like zero-config setup, powerful mocking capabilities, and a rich set of matchers to test your code effectively.

**Setting Up Jest in Your Node.js Project**

**Step 1: Initialize Your Project**

    mkdir jest-testing
    cd jest-testing
    npm init -y

**Step 2: Install Jest**
    
    npm i jest

    Update your package.json to include a test script:

        {
            "scripts": {
                "test": "jest"
            }
        }
**Writing Your First Test**\
Refer to   Codes in the  root directory\


    _./intro/math_functions.js_
there are simple functions  which  will test  next

Now, create a test file named _math_functions.test.js_ in root directory in the _tests/intro_:

    _./tests/intro/math_functions.test.js_

Copy    codes Respectively 
for each  file

Run your tests using the npm test script

    npm test

**Note:**
We provided multiple examples on unit testing  where   different units are  present in the intro and medium directories form the root  and each  unit has a respective test in the tests directory