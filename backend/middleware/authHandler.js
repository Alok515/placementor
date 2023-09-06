import jwt from 'jsonwebtoken';
import auth from '../controller/auth/authController.js'

const checkAuth = (req, res, next) => {
    const newToken = auth.newToken;
    if(!newToken?.token) {
        return res.render('login.ejs', {
            title: 'Login Please',
        })
    }
    try {
        const token = newToken?.token;
        jwt.verify(token, process.env.JWT_SECRET);
    next();
    } catch (error) {
        console.log(error.message);
    }
}

export default checkAuth;