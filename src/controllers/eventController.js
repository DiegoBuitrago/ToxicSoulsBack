import Event from '../models/Event';
import app from '../app';


export const createEvent = async (req, res) => {
    console.log('Try to create event')
    console.log(req.body)
    console.log("***********")
    const { date_event, city_event, direction_event, description_event, presale, artists, flyer } = req.body;
    console.log(date_event, city_event, direction_event, description_event, presale, artists, flyer)
    try{
        var event = new Event({
            date_event,
            city_event,
            direction_event, //Se supone que esta llega en coordenadas de google maps.
            description_event,
            presale,
            artists,
            flyer
        });
        console.log('event', event)
        await event.save();
        return res.status(200).send({
            status: 'ok',
            event: event
        });
    } catch (error) {
        return res.send({
            status: 'error 400',
            message: `The event could not be registered possible causes are insufficient or duplicate data.`
        });
    }
};

export const getEventById = async (req, res, next) => {
    const id = req.params._id;
    try {
        const event = await Event.findById({ _id: id });
        if (!event) return res.status(400).send({
            status: 'error',
            message: 'The event does not exist'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Event found',
            event
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });
        next();
    }
};

export const getEvents = async (req, res) => {
    const events = await Event.find();
    res.status(200).send({
        'status': 'ok',
        events
    });
};

export const editEvent = async (req, res, next) => {
    const id = req.params._id;
    try {
        const data = req.body;
        const eventEdit = await Event.findOneAndUpdate({ _id: id }, data, {
            new: true
        });
        if (!eventEdit) return res.status(400).send({
            status: 'error',
            message: 'The event cannot be modified'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'Event modified',
            eventEdit
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });
        next();
    }
};

export const deleteEvent = async (req, res, next) => {
    const id = req.params._id;
    try {
        const event = await Event.findByIdAndDelete({ _id: id });
        if (!event) return res.status(400).send({
            status: 'error',
            message: 'The event could not be removed'
        });
        return res.status(200).send({
            status: 'ok',
            message: 'The event was deleted',
            event
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: 'The server cannot process the request'
        });
        next();
    }
};