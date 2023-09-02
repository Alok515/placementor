import Employee from '../../model/employee.js';
import JWT from 'jsonwebtoken';

const createToken = ( id ) => {
    return JWT.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '15min'}
        );
}
const login = async ( req, res ) => {
    try {
        const emp = await Employee.login( req.body );
        const token = createToken( emp._id );
        return res.status(200).json({
            employee: emp._id,
            token: token
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}

const signup = async ( req, res ) => {
    try {
        const emp = await Employee.signup( req.body );
        const token = createToken( emp._id );
        return res.status(201).json({
            employee: emp._id,
            token: token
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}

const auth = {
    login,
    signup
};

export default auth;
