import { Schema, model } from 'mongoose';

export const ROLES = ["super-admin", "admin"];

const RoleModel = new Schema({
    name: {type: String, required: true, unique: true}
}, {
    versionKey: false
});

export default model ('Role', RoleModel);