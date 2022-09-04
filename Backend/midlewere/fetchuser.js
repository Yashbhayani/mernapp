const { request } = require('express');
const jwt = require('jsonwebtoken');
const JWT_SCERET = 'Yashisagoodboy';

const fetchUser = (req, res, next) => {
    //GET the User
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SCERET);
        console.log(data);
        req.user = data.user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'please authenticate using a valid token' });
    }
}

module.exports = fetchUser;