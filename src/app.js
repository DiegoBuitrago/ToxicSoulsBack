import express from 'express';
import cors from 'cors';
//import bodyParser , {urlencoded} from 'body-parser';
import userRoutes from './routes/user.routes';
import eventRoutes from './routes/eventRoutes';
import { removeAllListeners } from 'nodemon';
import multer from 'multer';

const upload = multer({dest: './uploads/' })
const app = express();

app.use(cors());
//app.use(express.json());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true}));

//app.use(bodyParser.json())

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