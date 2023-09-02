import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if ( !authorization ){
        return res.status(401).json({ msg: 'Missing authorization token please Login' }); 
    }
    try {
        const token1 = authorization.split(' ')[1];
        const { id } = jwt.verify(token1, process.env.JWT_SECRET);
        req.emp = id;
    next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

export default checkAuth;