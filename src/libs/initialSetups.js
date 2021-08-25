import Role from '../models/Role';
import User from '../models/User';
import jwt  from 'jsonwebtoken';
import config from '../config';


//esto se ejecuta a penas se ejecuta el servidor
//metodo para crear los roles
export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: 'super-admin' }).save(),
            new Role({ name: 'admin' }).save(),
        ]);

        //console.log(values);

    } catch (error) {
        console.log(error);
    }
};

//método para registrar un unico super administrador
export const registerSuperAdmin = async () => {
    const roleAdmin = await Role.findOne({ name: 'super-admin' });
    //console.log(roleAdmin);
    const superAdminExist = await User.findOne({ roles: [roleAdmin._id] });
    //console.log(superAdminExist);
    if (superAdminExist) return;

    const user = new User({
        cc: 12345,
        name: 'super admin',
        email: 'superAdmin@gmail.com',
        password: await User.encryptPassword('123'),
        roles: ['61258010d584513a7ca33c3c']
    });

    await user.save();
    const token = await jwt.sign({ _id: user._id }, config.SECRET, {
        expiresIn: 86400 //24 hours
    });
    console.log(user);
    console.log('token : ', token);
};

