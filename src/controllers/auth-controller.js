const hashService = require('../services/hash-service');
const jwtService = require('../services/jwt-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const authController = {};

// Async function => fn อนุญาตให้การทำงานบางอย่างดำเนินการในพื้นหลังโดยไม่ต้องบล็อกการทำงานของฟังก์ชันอื่น
// Check by hover at function => Check promise
authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    console.log(data);
    // await => wait data from database
    // service function => connect prisma

    // ตรวจสอบว่า user มีอยู่แล้วหรือไม่
    const existUser = await userService.findExistUser(data);
    if (existUser) {
      createError({
        message: 'username or email is already in use',
        statusCode: 400,
      });
    }

    // hash password ของผู้ใช้ก่อนที่จะบันทึกลง database
    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ message: 'user created' });
  } catch (err) {
    next(err);
  }
};

authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findExistUser(req.input);
    if (!existUser) {
      createError({
        message: 'invalid username',
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      existUser.password
    );

    if (!isMatch) {
      createError({
        message: 'invalid password',
        statusCode: 400,
      });
    }
    // create token
    // Header.Payload(userID).Signature
    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

authController.getMe = (req, res, next) => {
  // send user detail to client side
  res.status(200).json({ user: req.user });
};

authController.updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const existUser = await userService.findUserbyId(req.body.id);
    if (!existUser) {
      createError({
        message: 'User not found',
        statusCode: 400,
      });
    }
    const data = { ...req.body };

    const result = await userService.patchUser(req.body.id, data);
    console.log(result);

    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = authController;
