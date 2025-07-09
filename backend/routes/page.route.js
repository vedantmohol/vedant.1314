import express from 'express';
import { getPageContent, updateAbout, updateContact, updateHome, updateProjects, updateServices } from '../controllers/page.controller.js';

const router = express.Router();

router.get('/',getPageContent);
router.put('/home',updateHome);
router.put('/about', updateAbout);
router.put('/services', updateServices);
router.put('/projects',updateProjects);
router.put('/contact',updateContact);

export default router;