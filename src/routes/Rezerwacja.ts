import express from 'express';
import controller from '../controllers/Rezerwacja';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.rezerwacja.create), controller.createRezerwacja);
router.get('/get/:rezerwacjaId', controller.readRezerwacja);
router.get('/get/', controller.readAll);
router.patch('/update/:rezerwacjaId',ValidateSchema(Schemas.rezerwacja.update), controller.updateRezerwacja);
router.delete('/delete/:rezerwacjaId', controller.deleteRezerwacja);

export = router;
