import express from 'express';
import { getPageContent, updateAbout, updateHome, updateServices } from '../controllers/page.controller.js';

const router = express.Router();

router.get('/',getPageContent);
router.put('/home',updateHome);
router.put('/about', updateAbout);
router.put('/services', updateServices);

export default router;