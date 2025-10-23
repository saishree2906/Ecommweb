import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
};

export const createCategory = async (req, res) => {
  const cat = new Category(req.body);
  const saved = await cat.save();
  res.status(201).json(saved);
};
