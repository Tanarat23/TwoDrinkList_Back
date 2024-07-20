const express = require('express');
const postController = require('../controllers/post-controller');

const postRouter = express.Router();

postRouter.post('/createPost', postController.createPost);

postRouter.get('/', postController.getPost);

postRouter.get('/:postId', postController.getPostById);

postRouter.patch('/:postId', postController.updatePost);

postRouter.delete('/:postId', postController.deletePost);

module.exports = postRouter;
