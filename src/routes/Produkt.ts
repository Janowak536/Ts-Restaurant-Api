import express from 'express';
import controller from '../controllers/Produkt';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.produkt.create), controller.createProdukt);
router.get('/get/:produktId', controller.readProdukt);
router.get('/get/', controller.readAll);
router.get('/sort',controller.readAllButSorted);
router.patch('/update/:produktId',ValidateSchema(Schemas.produkt.update), controller.updateProdukt);
router.delete('/delete/:produktId', controller.deleteProdukt);

export = router;
