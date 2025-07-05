import express from 'express';
import { getPageContent, updateHome } from '../controllers/page.controller.js';

const router = express.Router();

router.get('/',getPageContent);
router.put('/home',updateHome);

export default router;