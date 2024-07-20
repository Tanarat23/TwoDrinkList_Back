const prisma = require('../models/prisma');

const postService = {};

postService.getPost = (userId) =>
  // findMany : get all post
  prisma.posts.findMany({
    // get data from other table
    include: {
      user: {
        select: {
          userName: true,
          profileImage: true,
        },
      },
      location: {
        select: {
          image: true,
          name: true,
        },
      },
      category: true,
      Joins: {
        where: { userId },
      },

      Joins: {
        select: {
          userId: true,
        },
      },
    },
  });

postService.getPostById = (id) =>
  prisma.posts.findFirst({
    where: { id },
    include: {
      location: {
        select: {
          image: true,
          name: true,
        },
      },
      category: true,
    },
  });

postService.findExistPost = (id) =>
  prisma.posts.findFirst({
    where: { id },
  });

postService.deletePost = (id) =>
  prisma.posts.delete({
    where: { id },
  });

postService.patchPost = (id, data) =>
  prisma.posts.update({
    where: { id },
    data,
  });

module.exports = postService;
