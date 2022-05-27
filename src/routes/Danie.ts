import express from 'express';
import controller from '../controllers/Danie';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.danie.create), controller.createDanie);
router.get('/get/:danieId', controller.readDanie);
router.get('/get/', controller.readAll);
router.patch('/update/:danieId',ValidateSchema(Schemas.danie.update), controller.updateDanie);
router.delete('/delete/:danieId', controller.deleteDanie);

export = router;
