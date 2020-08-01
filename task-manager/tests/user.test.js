const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const {userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'TestUser',
        email: 'shufflebyte@googlemail.com',
        password: '123hkeifj6'
    }).expect(201);

    // Assert that the db was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    
    // Assertions about the response
    expect(response.body.user.name).toBe('TestUser');
    expect(response.body).toMatchObject({
        user: {
            name: 'TestUser',
            email: 'shufflebyte@googlemail.com', 
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('123hkeifj6');
});

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)

});

test('should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongpassword'
    }).expect(400);
});

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    user = await User.findById(user.userOneId);
    expect(user).toBeNull();
});

test('should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('sould upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);

    const user = await User.findById(userOneId);
    // toBe works with === which compares if the objects are the same Blitz!
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            name: 'Jess'
        })
        .expect(200);

        const user = await User.findById(userOneId);
        expect(user.name).toEqual('Jess');
});

test('should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            location: 'Cologne'
        })
        .expect(400);
});