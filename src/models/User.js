import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const UserModel = new Schema ({
    cc: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, unique: true, maxlength: 100, required: true},
    password: {type: String, required: true}, 
    //role faltaría agregar los roles
}, {
    timestamps: true,
    versionKey: false
});

UserModel.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserModel.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model('User', UserModel);