const prisma = require('../models/prisma');

const userService = {};

userService.createUser = (data) => prisma.users.create({ data });

// find username and email from database
userService.findExistUser = (data) =>
  prisma.users.findFirst({
    where: {
      OR: [{ userName: data.userName }, { email: data.email }],
    },
  });

userService.findUserbyId = (id) => prisma.users.findFirst({ where: { id } });

// patch must have id and data
userService.patchUser = (id, data) =>
  prisma.users.update({
    where: { id },
    data,
  });

module.exports = userService;
