import { Router } from 'express';
import checkAuth from '../../middleware/authHandler.js';
import studentController from '../../controller/emp/empController.js';

const router = new Router();

router.use(checkAuth);
router.route('/').get((req, res) => {
    res.json({"msg": "Namasthy have a nice day!"});
});

router.route('/addstudent/:id').post(studentController.addStudent);
router.route('/getstudent/:id').get(studentController.getStudent);
router.route('/addinterview/:id').post(studentController.addinterview);
router.route('/getinterview/:id').get(studentController.getInterview);

export default router;