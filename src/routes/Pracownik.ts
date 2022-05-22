import express from 'express';
import controller from '../controllers/Pracownik';

const router = express.Router();

router.post('/create', controller.createPracownik);
router.get('/get/:pracownikId', controller.readPracownik);
router.get('/get/', controller.readAll);
router.patch('/update/:pracownikId', controller.updatePracownik);
router.delete('/delete/:pracownikId', controller.deletePracownik);

export = router;
