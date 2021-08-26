import { Schema, model } from "mongoose";
import Presale from '../models/Presale';
import Artist from '../models/Artist';

const EventModel = new Schema ({
    date_event: {type: String, required: true},
    city_event: {type: String, required: true},
    direction_event: {type: String, required: false},
    description_event: {type: String, unique: true, maxlength: 1000, required: false},
    presale: [{ref:Presale, type: Schema.Types.ObjectId, require: true}],
    artists: [{ref:Artist, type: Schema.Types.ObjectId, require: true}],
    flyer: {type: String, required: false}
}, {
    timestamps: true,
    versionKey: false
});

export default model('Event', EventModel);