import express from 'express';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/eventRoutes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
       'Company name': 'Toxic Souls Records' 
    });
});

app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);

export default app;