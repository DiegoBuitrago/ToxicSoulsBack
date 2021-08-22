import Event from '../models/Event';

export const createEvent = async (req, res) => {
    console.log('Try to create event')
    const { id, date_event, city_event, direction_event, description_event, presale, flyer } = req.body;
    try {
        const event = new Event({
            id,
            date_event,
            city_event,
            direction_event, //Se supone que esta llega en coordenadas de google maps.
            description_event,
            presale,
            //flyer: await send to cloudinary when we gonna upload img
        });
        await event.save();
        return res.status(200).send({
            status: 'ok',
            token
        });
    } catch (error) {
        return res.send({
            status: 'error 400',
            message: `The event could not be registered possible causes are insufficient or duplicate data.`
        });
    }
};

export const getEvents = async (req, res) => {
    const events = await Event.find();
    res.status(200).send({
        'status': 'ok',
        events
    });
};