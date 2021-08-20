import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

export const registerUser = async (req, res) => {

    const { cc, name, email, password } = req.body;

    try {
        const user = new User({
            cc,
            name,
            email,
            password: await User.encryptPassword(password)
        });
        await user.save();

        const token = await jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400 //24 hours
        });

        return res.status(200).send({
            status: 'ok',
            token
        });
    } catch (error) {
        return res.send({
            status: 'error',
            message: `The user could not be registered possible causes are insufficient or duplicate data.`
        });
    }
};

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).send({
        'status': 'ok',
        users
    });
};

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(400).send({
        status: 'error',
        message: `User not found`
    });

    const passwordMatch = await User.comparePassword(password, user.password);

    if (!passwordMatch) return res.status(401).send({
        status: 'error',
        message: `Wrong password`
    });

    const token = await jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 86400
    });

    return res.status(200).send({
        status: 'Ok',
        token
    });
};