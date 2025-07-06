import express from 'express';
import { getPageContent, updateAbout, updateHome } from '../controllers/page.controller.js';

const router = express.Router();

router.get('/',getPageContent);
router.put('/home',updateHome);
router.put('/about', updateAbout);

export default router;