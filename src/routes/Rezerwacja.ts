import express from 'express';
import controller from '../controllers/Rezerwacja';

const router = express.Router();

router.post('/create', controller.createRezerwacja);
router.get('/get/:rezerwacjaId', controller.readRezerwacja);
router.get('/get/', controller.readAll);
router.patch('/update/:rezerwacjaId', controller.updateRezerwacja);
router.delete('/delete/:rezerwacjaId', controller.deleteRezerwacja);

export = router;
