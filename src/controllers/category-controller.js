const prisma = require('../models/prisma');
const createError = require('../utils/create-error');

const categoryController = {};

// categoryController.createPost = async (req, res, next) => {
//   try {
//     const data = {
//       name: req.body.name,
//     };

//     await prisma.categorys.create({
//       data,
//     });

//     res.status(201).json({ message: 'category has been created' });
//   } catch (err) {
//     next(err);
//   }
// };

categoryController.getCategory = async (req, res, next) => {
  try {
    const response = await prisma.categorys.findMany();

    res.status(200).json({ categorys: response });
  } catch (err) {
    next(err);
  }
};

module.exports = categoryController;
