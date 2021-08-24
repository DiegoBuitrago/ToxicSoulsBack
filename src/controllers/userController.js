import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).send({
        'status': 'ok',
        users
    });
};

export const getUserById = async (req, res, next) => {
    const id = req.params._id;
    try {
        const user = await User.findById({_id: id});
        if(!user) return res.status(400).send({
            status: 'error',
            message: 'The user does not exist'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'User found',
            user
        });
    }catch(err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });

        next();
    }
};

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

export const editUser = async (req, res, next) => {
    const id = req.params._id;
    try {
        const data = req.body;
        const userEdit = await User.findOneAndUpdate({_id: id}, data, {
            new: true
        });
        if(!userEdit) return res.status(400).send({
            status: 'error',
            message: 'The user cannot be modified'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'User modified',
            userEdit
        });
    }catch(err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });

        next();
    }
};

export const deleteUser = async (req, res, next) => {
    const id = req.params._id;
    try {
        const user = await User.findByIdAndDelete({_id: id});
        if(!user) return res.status(400).send({
            status: 'error',
            message: 'The user could not be removed'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'The user was deleted',
            user
        });
    }catch(err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });

        next();
    }
};