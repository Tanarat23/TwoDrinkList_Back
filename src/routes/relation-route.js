const express = require('express');
const relationController = require('../controllers/relation-controller');
const relationRouter = express.Router();

relationRouter.post('/', relationController.createRelation);
relationRouter.delete('/:postId', relationController.deleteRelation);
relationRouter.get('/', relationController.getRelationById);
module.exports = relationRouter;
