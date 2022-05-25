import express from 'express';
import controller from '../controllers/Produkt';

const router = express.Router();

router.post('/create', controller.createProdukt);
router.get('/get/:produktId', controller.readProdukt);
router.get('/get/', controller.readAll);
router.get('/sort',controller.readAllButSorted);
router.patch('/update/:produktId', controller.updateProdukt);
router.delete('/delete/:produktId', controller.deleteProdukt);

export = router;
