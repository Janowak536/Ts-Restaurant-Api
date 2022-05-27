import express from 'express';
import controller from '../controllers/Stolik';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.stolik.create), controller.createStolik);
router.get('/get/:stolikId', controller.readStolik);
router.get('/wolne',controller.readWolneStoliki);
router.get('/wolne/:iloscOsob',controller.readWolneStolikiLiczbaOsob);
router.get('/get/', controller.readAll);
router.patch('/update/:stolikId',ValidateSchema(Schemas.stolik.update), controller.updateStolik);
router.delete('/delete/:stolikId', controller.deleteStolik);

export = router;
