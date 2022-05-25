import express from 'express';
import controller from '../controllers/Stolik';

const router = express.Router();

router.post('/create', controller.createStolik);
router.get('/get/:stolikId', controller.readStolik);
router.get('/wolne',controller.readWolneStoliki);
router.get('/wolne/:iloscOsob',controller.readWolneStolikiLiczbaOsob);
router.get('/get/', controller.readAll);
router.patch('/update/:stolikId', controller.updateStolik);
router.delete('/delete/:stolikId', controller.deleteStolik);

export = router;
