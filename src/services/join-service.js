const prisma = require('../models/prisma');

const joinService = {};

joinService.deletePost = (postId) =>
  prisma.joins.deleteMany({
    where: { postId },
  });

module.exports = joinService;
