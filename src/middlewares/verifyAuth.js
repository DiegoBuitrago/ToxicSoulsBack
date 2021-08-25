import jwt from "jsonwebtoken";
import config from '../config';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["access-token"];
        if (!token) return res.status(403).send({
            status: 'error',
            message: 'No token provided'
        });

        const decodeToken = jwt.verify(token, config.SECRET);
        req._id = decodeToken._id;

        const user = await User.findById(req._id, { password: 0 });

        if (!user) return res.status(404).send({
            status: 'error',
            message: 'User not found'
        });

        next();

    } catch (error) {
        return res.status(401).send({
            status: 'error',
            message: 'Unauthorized'
        });
    }
};