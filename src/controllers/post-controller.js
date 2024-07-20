const prisma = require('../models/prisma');
const createError = require('../utils/create-error');
const postService = require('../services/post-service');
const userService = require('../services/user-service');
const joinService = require('../services/join-service');

const postController = {};

postController.createPost = async (req, res, next) => {
  try {
    // clone req.body
    const data = { ...req.body };
    // add userId to data
    data.userId = req.user.id;
    console.log(data);

    // const existUser = await prisma.users.findFirst({
    //   where: { id: +data.userId },
    // });

    // if (!existUser) {
    //   createError({
    //     message: 'user not found',
    //     statusCode: 400,
    //   });
    // }

    await prisma.posts.create({ data });

    res.status(201).json({ message: 'post has been created' });
  } catch (err) {
    next(err);
  }
};

postController.getPost = async (req, res, next) => {
  try {
    const getPost = await postService.getPost(req.user.id);
    res.status(200).json({ posts: getPost });
  } catch (err) {
    next(err);
  }
};

postController.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log('post id', postId);

    const existPost = await postService.findExistPost(+postId);
    if (!existPost) {
      createError({
        message: 'Not found post',
        statusCode: 400,
      });
    }

    console.log(existPost);

    const existUser = await userService.findUserbyId(req.user.id);
    if (!existUser) {
      createError({
        message: 'Not found user',
        statusCode: 400,
      });
    }

    console.log(existPost.userId === req.user.id);
    if (existPost.userId !== req.user.id) {
      createError({
        message: 'cannot delete post',
        statusCode: 403,
      });
    }
    await joinService.deletePost(existPost.id);
    await postService.deletePost(existPost.id);
    res.status(204).json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

postController.updatePost = async (req, res, next) => {
  try {
    // const { postId } = req.params;
    // console.log(postId);
    // find post in database
    const existPost = await postService.findExistPost(req.body.id);
    if (!existPost) {
      createError({
        message: 'Post not found',
        statusCode: 400,
      });
    }
    // find user by userId
    const existUser = await userService.findUserbyId(req.body.userId);
    if (!existUser) {
      createError({
        message: 'user not found',
        statusCode: 400,
      });
    }
    console.log(existPost);
    // check : user req edit is post owner?
    if (existPost.userId !== req.body.userId) {
      createError({
        message: 'Can not edit this post',
        statusCode: 400,
      });
    }
    // delete ค่าที่ไม่ต้องการแก้ไข
    const data = { ...req.body };
    delete data.location;
    delete data.category;

    console.log(data);

    data.locationId = +data.locationId;
    data.categoryId = +data.categoryId;
    data.joinLimit = +data.joinLimit;

    // call service patchPost for update data
    const result = await postService.patchPost(req.body.id, data);

    console.log(result);
    res.status(200).json({ message: 'Edit done' });
  } catch (error) {
    next(error);
  }
};

postController.getPostById = async (req, res, next) => {
  try {
    console.log(req.params.postId);
    const getPostById = await postService.getPostById(+req.params.postId);

    res.status(200).json({ posts: getPostById });
  } catch (err) {
    next(err);
  }
};

module.exports = postController;
