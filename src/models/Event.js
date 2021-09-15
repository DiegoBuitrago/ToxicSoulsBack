import { Schema, model } from "mongoose";
import Presale from '../models/Presale';
import Artist from '../models/Artist';

const EventModel = new Schema ({
    date_event: {type: String, required: true},
    city_event: {type: String, required: true},
    direction_event: {type: String, required: false},
    description_event: {type: String, maxlength: 1000, required: false},
    presales: [{ref:Presale, type: Object, require: true}],
    artists: [{ref: Artist, type:Object, require: true}],
    flyer: {type: String, required: false},
    capacity: {type: Number, required: false}
}, {
    timestamps: true,
    versionKey: false
});

export default model('Event', EventModel);