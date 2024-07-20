const prisma = require('../models/prisma');

const relationService = {};

relationService.createRelation = (data) => prisma.joins.create({ data });
relationService.deleteRelation = (id) =>
  prisma.joins.delete({
    where: { id },
  });

relationService.findExistRelation = ({ userId, postId }) =>
  prisma.joins.findFirst({
    where: { postId, userId },
  });

relationService.getRelationById = (userId) =>
  prisma.joins.findMany({
    where: { userId },
  });

module.exports = relationService;
