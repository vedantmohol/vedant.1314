import Page from "../models/page.model.js";

export const getPageContent = async (req, res, next) => {
  try {
    let page = await Page.findOne(); 
    if (!page) {
      page = await Page.create({}); 
    }
    res.status(200).json(page);
  } catch (err) {
    next(err);
  }
};

export const updateHome = async (req, res,next) => {
  try {
    const { image, text, pdf } = req.body;
    let page = await Page.findOne();
    if (!page) page = await Page.create({});

    if (image !== undefined) page.home.image = image;
    if (text !== undefined) page.home.text = text;
    if (pdf !== undefined) page.home.pdf = pdf;

    await page.save();
    res.status(200).json(page.home);
  } catch (err) {
    next(err)
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { image, text } = req.body;
    let page = await Page.findOne();
    if (!page) page = await Page.create({});

    if (image !== undefined) page.about.image = image;
    if (text !== undefined) page.about.text = text;

    await page.save();
    res.status(200).json(page.about);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update about content' });
  }
};

export const updateServices = async (req, res) => {
  try {
    const { list } = req.body; 
    let page = await Page.findOne();
    if (!page) page = await Page.create({});

    if (Array.isArray(list)) page.services.list = list;

    await page.save();
    res.status(200).json(page.services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update services' });
  }
};

export const updateProjects = async (req, res) => {
  try {
    const { list } = req.body; 
    let page = await Page.findOne();
    if (!page) page = await Page.create({});

    if (Array.isArray(list)) page.projects.list = list;

    await page.save();
    res.status(200).json(page.projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update projects'});
  }
};

export const updateContact = async (req, res) => {
  try {
    const { email, phone } = req.body;
    let page = await Page.findOne();
    if (!page) page = await Page.create({});

    if (email !== undefined) page.contact.email = email;
    if (phone !== undefined) page.contact.phone = phone;

    await page.save();
    res.status(200).json(page.contact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact content' });
  }
};
