import * as express from 'express';
import medialogRoute from './medialog.route';

const router = express.Router();

router.use('/medialog', medialogRoute);

export default router;