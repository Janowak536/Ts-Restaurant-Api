import express from 'express';
import controller from '../controllers/Restauracja';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.restauracja.create),controller.createRestauracja);
router.get('/get/:restauracjaId', controller.readRestauracja);
router.get('/get/', controller.readAllRestauracja);
router.patch('/update/:restauracjaId',ValidateSchema(Schemas.restauracja.update), controller.updateRestauracja);
router.delete('/delete/:restauracjaId', controller.deleteRestauracja);

export =router;