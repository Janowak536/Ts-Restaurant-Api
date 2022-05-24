import express from 'express';
import controller from '../controllers/Danie';

const router = express.Router();

router.post('/create', controller.createDanie);
router.get('/get/:danieId', controller.readDanie);
router.get('/get/', controller.readAll);
router.patch('/update/:danieId', controller.updateDanie);
router.delete('/delete/:danieId', controller.deleteDanie);

export = router;
