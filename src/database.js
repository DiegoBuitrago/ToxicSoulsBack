import moongose from "mongoose";

moongose.connect('mongodb://localhost/toxic-souls-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error));