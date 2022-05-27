import express from 'express';
import controller from '../controllers/Zamowienie';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.zamowienie.create), controller.createZamowienie);
router.get('/get/:zamowienieId', controller.readZamowienie);
router.get('/get/', controller.readAll);
router.get('/stolik/:stolikId',controller.readStolikId);
router.get('/pracownik/:pracownikId',controller.readPracownikId);
router.patch('/update/:zamowienieId',ValidateSchema(Schemas.zamowienie.update), controller.updateZamowienie);
router.delete('/delete/:zamowienieId', controller.deleteZamowienie);

export = router;
