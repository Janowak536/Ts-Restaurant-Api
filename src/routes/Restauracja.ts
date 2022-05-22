import express from 'express';
import controller from '../controllers/Restauracja';

const router = express.Router();

router.post('/create',controller.createRestauracja);
router.get('/get/:restauracjaId', controller.readRestauracja);
router.get('/get/', controller.readAllRestauracja);
router.patch('/update/:restauracjaId', controller.updateRestauracja);
router.delete('/delete/:restauracjaId', controller.deleteRestauracja);

export =router;