import Artist from '../models/Artist';
import app from '../app';


export const createArtist = async (req, res) => {
    console.log('Try to create artist')
    console.log(req.body)
    console.log("***********")
    const { name_artist, city_event, description_artist, nationality_artist, photo_artist} = req.body;
    console.log(name_artist, city_event, description_artist, nationality_artist, photo_artist)
    try{
        var artist = new Artist({
            name_artist,
            description_artist,
            nationality_artist,
            photo_artist
        });
        console.log('artist', artist)
        await artist.save();
        return res.status(200).send({
            status: 'ok',
            event: artist
        });
    } catch (error) {
        return res.send({
            status: 'error 400',
            message: `The event could not be registered possible causes are insufficient or duplicate data.`
        });
    }
};

export const getArtistById = async (req, res) => {
    const id = req.params._id;
    try {
        const event = await Artist.findById({ _id: id });
        if (!event) return res.status(400).send({
            status: 'error',
            message: 'Artist does not exist'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Artist found',
            event
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });
        //next();
    }
};

export const getArtists = async (req, res) => {
    const artists = await Artist.find();
    res.status(200).send({
        'status': 'ok',
        artists
    });
};

export const editArtist = async (req, res) => {
    console.log('edit', req.body)
    const id = req.params._id;
    try {
        const data = req.body;
        const artistEdit = await Artist.findOneAndUpdate({ _id: id }, data, {
            new: true
        });
        if (!artistEdit) return res.status(400).send({
            status: 'error',
            message: 'Artist cannot be modified'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Artist modified',
            artistEdit
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });
        //next();
    }
};

export const deleteArtist = async (req, res, next) => {
    const id = req.params._id;
    try {
        const artist = await Artist.findByIdAndDelete({ _id: id });
        if (!artist) return res.status(400).send({
            status: 'error',
            message: 'Artist could not be removed'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Artist was deleted',
            artist
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });
        next();
    }
};