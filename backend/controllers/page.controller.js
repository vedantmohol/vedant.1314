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