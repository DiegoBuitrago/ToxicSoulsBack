import { Schema, model } from "mongoose";
import Presale from '../models/Presale';

const EventModel = new Schema ({
    id_event: {type: Number, required: true, unique: true},
    date_event: {type: String, required: true},
    city_event: {type: String, required: true},
    direction_event: {type: String, required: false},
    description_event: {type: String, unique: true, maxlength: 1000, required: false},
    presale: [{ref:Presale, type: Schema.Types.ObjectId, require: false}],
    flyer: {type: String, required: false}
}, {
    timestamps: true,
    versionKey: false
});

export default model('Event', EventModel);