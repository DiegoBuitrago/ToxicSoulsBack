import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import nodemailer from 'nodemailer';

let dataClient = null;

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: 'fuera.deo.tunja@gmail.com',
      pass: 'lalala123..'
    }
});

function sendEmail(mail){
    transporter.sendMail({
        from: 'fuera.deo.tunja@gmail.com',
        to: mail,
        subject: 'Confirmación pago TOXIC SOULS RECORDS',
        text: `Hemos recibido un pago para un evento de TOXIC SOULS RECORDS.\n
        a nombre de ${dataClient.customer_data.full_name} 
        con documento de identificación ${dataClient.customer_data.legal_id_type}-${dataClient.customer_data.legal_id} 
        y número de celular ${dataClient.customer_data.phone_number}\n
        Transacción con un valor de ${dataClient.amount_in_cents/100} COP, por medio de ${dataClient.payment_method_type}`,
    });
}

export const emailConfirm = async(req, res) => {
    dataClient = req.body.data.transaction
    console.log('email',dataClient.customer_email);
    console.log('client',dataClient.customer_data);
    await sendEmail(dataClient.customer_email);
    return res.sendStatus(200)
}

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
        const user = await User.findById({ _id: id });
        if (!user) return res.status(400).send({
            status: 'error',
            message: 'The user does not exist'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'User found',
            user
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });

        next();
    }
};

export const registerUser = async (req, res) => {

    const { cc, name, email, password, roles } = req.body;

    try {
        const newUser = new User({
            cc,
            name,
            email,
            password: await User.encryptPassword(password),
            roles
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({name: "admin"});
            newUser.roles = [role._id];
        }

        const userSaved = await newUser.save();

        const token = await jwt.sign({ _id: userSaved._id }, config.SECRET, {
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

    const token = await jwt.sign({ _id: user._id }, config.SECRET, {
        expiresIn: 86400
    });

    const role = await Role.findOne({_id: user.roles[0]});

    return res.status(200).send({
        status: 'Ok',
        role: role.name,
        name: user.name,
        email: user.email,
        token
    });
};

export const editUser = async (req, res, next) => {
    const id = req.params._id;
    try {
        const {cc, name, email, password, roles} = req.body;
        const newPassword = await User.encryptPassword(password);
        const userData = {
            cc,
            name,
            email,
            password: newPassword, 
            roles 
        };
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            userData.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({name: "admin"});
            userData.roles = [role._id];
        }

        const userEdit = await User.findOneAndUpdate({ _id: id }, userData, {
            new: true
        });
        if (!userEdit) return res.status(400).send({
            status: 'error',
            message: 'The user cannot be modified'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'User modified',
            userEdit
        });
    } catch (err) {
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
        const user = await User.findByIdAndDelete({ _id: id });
        if (!user) return res.status(400).send({
            status: 'error',
            message: 'The user could not be removed'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'The user was deleted',
            user
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });

        next();
    }
};