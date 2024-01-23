const jwt = require('jsonwebtoken');
const { decodeJWT } = require('../services/auth/jwt');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = await decodeJWT(token);
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
