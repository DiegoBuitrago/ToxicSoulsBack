import { Schema, model } from "mongoose";

const UserModel = new Schema ({
    //atributos y tipo de datos de los atributos para cada usuario
}, {
    timestamps: true,
    versionKey: false
});

export default model('User', UserModel);