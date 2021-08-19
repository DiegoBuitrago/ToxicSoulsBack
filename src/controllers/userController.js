import User from '../models/User';

export const registerUser = async (req, res) => {
   
    const {cc, name, email, password} = req.body;

    try {
        const user = await new User ({ 
            cc,
            name,
            email, 
            password: await User.encryptPassword(password)
        });
           
       console.log(user);
       return res.status(200).send({
           status: 'ok',
           user
       });
   } catch (error) {
       return res.send({
           status : 'error',
           message: 'Incomplete data'
       });
   }
};