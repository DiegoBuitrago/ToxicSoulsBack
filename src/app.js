import express from 'express';
import cors from 'cors';
//import bodyParser , {urlencoded} from 'body-parser';
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

function removeByteOrderMark(str){
    return str.replace(/^\ufeff/g,"")
}

app.post('/eventss', (req, res) => {
    console.log(req);
    res.sendStatus(200);
})

app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);

export default app;