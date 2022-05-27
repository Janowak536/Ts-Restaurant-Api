import express from 'express';
import controller from '../controllers/Zamowienie';

const router = express.Router();

router.post('/create', controller.createZamowienie);
router.get('/get/:zamowienieId', controller.readZamowienie);
router.get('/get/', controller.readAll);
router.get('/stolik/:stolikId',controller.readStolikId);
router.get('/pracownik/:pracownikId',controller.readPracownikId);
router.patch('/update/:zamowienieId', controller.updateZamowienie);
router.delete('/delete/:zamowienieId', controller.deleteZamowienie);

export = router;
