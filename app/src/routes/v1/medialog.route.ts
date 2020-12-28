import * as express from 'express';
import MedialogController  from '../../controller/medialog.controller';

const router = express.Router();

router.get('/swp_retourneNbPiecesContenu', MedialogController.swp_retourneNbPiecesContenu);
router.post('/swp_retourneTarif', MedialogController.swp_retourneTarif);
router.post('/swp_retourneTarifPdf', MedialogController.swp_retourneTarifPdf);
router.get('/swp_retourneListebulleAide', MedialogController.swp_retourneListebulleAide);

export default router;