import express from 'express';
import userRoutes from './routes/user.routes';
import { createRoles, registerSuperAdmin } from './libs/initialSetups';

const app = express();

createRoles();
registerSuperAdmin();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        'Company name': 'Toxic Souls Records'
    });
});

app.use('/api/user', userRoutes);

export default app;