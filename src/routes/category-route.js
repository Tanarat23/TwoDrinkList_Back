const express = require('express');
const categoryController = require('../controllers/category-controller');

const categoryRouter = express.Router();

// categoryRouter.post('/', categoryController.createPost);
categoryRouter.get('/', categoryController.getCategory);

module.exports = categoryRouter;
