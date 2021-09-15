import Event from '../models/Event';
import Presale from '../models/Presale';
import app from '../app';


export const createEvent = async (req, res) => {
    console.log('Try to create event')
    console.log(req.body)
    console.log("***********")
    const { date_event, city_event, direction_event, description_event, presales, artists, flyer, capacity} = req.body;
    console.log(date_event, city_event, direction_event, description_event, presales, artists, flyer, capacity)
    try{
        var event = new Event({
            date_event,
            city_event,
            direction_event, //Se supone que esta llega en coordenadas de google maps.
            description_event,
            artists,
            flyer,
            capacity
        });
        await presales.forEach(async(value) => {
            console.log('presaels', value);
            var presale = new Presale({
                date_end_presale : value.date_end_presale,
                price_presale : value.price_presale
            })
            event.presales.push(presale);
        });
        await event.save();
        console.log('event', event)
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

export const getEventById = async (req, res) => {
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
        //next();
    }
};

export const getEvents = async (req, res) => {
    const events = await Event.find();
    res.status(200).send({
        'status': 'ok',
        events
    });
};

export const editEvent = async (req, res) => {
    console.log('edit', req.body)
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
        //next();
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