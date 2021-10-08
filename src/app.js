import express from 'express';
import cors from 'cors';
//import bodyParser , {urlencoded} from 'body-parser';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/eventRoutes';
import artistRoutes from './routes/artistRoutes';
import { createRoles, registerSuperAdmin } from './libs/initialSetups';
 
const app = express();

createRoles();
registerSuperAdmin();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    console.log('primer get')
    res.send({
        'Company name': 'Toxic Souls Records'
    });
});

app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/artists', artistRoutes);

export default app;