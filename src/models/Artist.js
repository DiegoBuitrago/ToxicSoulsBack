import { Schema, model } from "mongoose";

const ArtistModel = new Schema ({
    name_artist: {type: String, required: true},
    description_artist: {type: String, required: false},
    nationality_artist: {type: String, required: false},
    photo_artist: {type: String, required: false}
}, {
    timestamps: true,
    versionKey: false
});

export default model('Artist', ArtistModel);