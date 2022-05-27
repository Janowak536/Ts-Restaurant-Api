import express from 'express';
import controller from '../controllers/Pracownik';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.pracownik.create), controller.createPracownik);
router.get('/get/:pracownikId', controller.readPracownik);
router.get('/get/', controller.readAll);
router.patch('/update/:pracownikId',ValidateSchema(Schemas.pracownik.update), controller.updatePracownik);
router.delete('/delete/:pracownikId', controller.deletePracownik);

export = router;
