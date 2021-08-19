import User from '../models/User';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

export const registerUser = (req, res) => {
    res.send('User register');
    console.log('user')
    controller.user
};

var controller = {

    user: (req, res) => {
        var cc = req.body.cc;
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        
        console.log('password controller:  '+ password)

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                console.log('hash:  '+hash)
                
            });
        });

        return res.status(200).send({
            cc,
            name,
            email,
            password
        })
    }
}