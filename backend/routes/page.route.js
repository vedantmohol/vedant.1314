import express from 'express';
import { updateHome } from '../controllers/page.controller.js';

const router = express.Router();

router.put('/home',updateHome);

export default router;