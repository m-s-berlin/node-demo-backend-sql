const mongoose = require('mongoose');
const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
// const dotenv = require('dotenv').config();


describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = { 
            _id: new mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true 
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // const decoded = jwt.verify(token, process.env.VIDLY_JWTPRIVATEKEY);
        expect(decoded).toMatchObject(payload);
    });
});