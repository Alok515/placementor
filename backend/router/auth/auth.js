import { Router } from 'express';
import auth from '../../controller/auth/authController.js';

const router = new Router();

router.route('/').get((req, res) => {
    res.json({"key": "holla"});
});

router.route('/login').get(auth.getLogin).post(auth.login);
router.route('/signup').get(auth.getSignUp).post(auth.signup);

export default router;