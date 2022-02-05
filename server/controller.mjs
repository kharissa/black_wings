import { createUser, findUserByEmail, createBusiness, findBusinesses } from './model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new business
 */
 app.post('/business', (req, res) => {
    createBusiness(req.body.name, req.body.description)
        .then(business => {
            res.type('application/json').status(201).json(business);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed, issue with given data.' });
        });
});

/**
 * Retrieve businesses. 
 */
 app.get('/businesses', (req, res) => {
    findBusinesses()
        .then(businesses => {
            res.type('application/json').status(200).json(businesses);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ Error: 'Request failed' });
        });
});

/**
 * Create a new user
 */
app.post('/users', (req, res) => {
    createUser(req.body.email, req.body.password)
        .then(user => {
            res.type('application/json').status(201).json(user);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed, issue with given data.' });
        });
});

/**
 * Retrive the user corresponding to the ID provided in the URL.
 */
app.get('/users/:_email', (req, res) => {
    const userEmail = req.params._email;
    const userPassword = req.params._password;
    findUserByEmail(userEmail)
        .then(user => { 
            if (user !== null) {
                // To-Do: Validate password
                res.type('application/json').status(200).json(user);
            } else {
                res.status(500).json({ Error: 'User not found' });
            }         
         })
        .catch(error => {
            res.status(500).json({ Error: 'Request failed, issue with given data.' });
        });

});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});