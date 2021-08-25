import User from '../models/User';
import Role from '../models/Role';

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req._id, { password: 0 });
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === 'super-admin') {
            next();
            return;
        }
    }
    return res.status(403).send({
        status: 'error',
        message: 'Require super-admin role'
    });
};