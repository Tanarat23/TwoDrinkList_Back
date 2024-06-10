const prisma = require('../models/prisma');

const userService = {};

userService.createUser = (data) => prisma.users.create({ data });
userService.findExistUser = (data) =>
  prisma.users.findFirst({
    where: {
      OR: [{ userName: data.userName }, { email: data.email }],
    },
  });

module.exports = userService;
