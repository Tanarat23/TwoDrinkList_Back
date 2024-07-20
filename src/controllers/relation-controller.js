const postService = require('../services/post-service');
const relationService = require('../services/relation-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const relationController = {};

relationController.createRelation = async (req, res, next) => {
  try {
    const data = req.body;

    const existPost = await postService.findExistPost(data.postId);
    if (!existPost) {
      createError({
        statusCode: 400,
        message: 'error post',
      });
    }
    const existUserId = await userService.findUserbyId(data.userId);

    if (!existUserId) {
      createError({
        statusCode: 400,
        message: 'error user',
      });
    }
    const existRelation = await relationService.findExistRelation(data);

    if (existRelation) {
      createError({
        statusCode: 400,
        message: 'error relation',
      });
    }
    await relationService.createRelation(req.body);
    res.status(200).json({ message: 'Join' });
  } catch (error) {
    next(error);
  }
};

relationController.deleteRelation = async (req, res, next) => {
  try {
    const data = { postId: +req.params.postId, userId: req.user.id };
    console.log(data);

    const existPost = await postService.findExistPost(data.postId);
    if (!existPost) {
      createError({
        message: 'Not found post',
        statusCode: 400,
      });
    }

    const existUser = await userService.findUserbyId(data.userId);
    if (!existUser) {
      createError({
        message: 'Not found user',
        statusCode: 400,
      });
    }

    const existRelation = await relationService.findExistRelation(data);
    console.log('existRelation', existRelation);
    if (!existRelation) {
      createError({
        message: 'relation found',
        statusCode: 400,
      });
    }
    console.log('from delete', existRelation);
    await relationService.deleteRelation(existRelation.id);
    res.status(204).json({ message: 'Relation delete done' });
  } catch (error) {
    next(error);
  }
};

relationController.getRelationById = async (req, res, next) => {
  try {
    const relations = await relationService.getRelationById(req.user.id);
    res.status(200).json({ relations });
  } catch (error) {
    next(error);
  }
};

module.exports = relationController;
