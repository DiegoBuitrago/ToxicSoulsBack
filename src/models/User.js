import { Schema, model } from "mongoose";

const UserModel = new Schema ({
    //atributos y tipo de datos de los atributos para cada usuario
    cc: String,
    name: String,
    email: String,
    password: String
}, {
    timestamps: true,
    versionKey: false
});

export default model('User', UserModel);