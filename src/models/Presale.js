import { Schema, model } from "mongoose";

const PresaleModel = new Schema ({
    price_presale: {type: Number, required: true},
    date_init_presale: {type: String, required: true},
    date_end_presale: {type: String, required: true}
}, {
    timestamps: true,
    versionKey: false
});

export default model('Presale', PresaleModel);