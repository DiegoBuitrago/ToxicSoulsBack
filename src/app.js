import express from 'express';
import userRoutes from './routes/user.routes';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
       'Company name': 'Toxic Souls Records' 
    });
});

app.use('/api/user', userRoutes);

export default app;