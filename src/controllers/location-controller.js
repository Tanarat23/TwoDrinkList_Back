const prisma = require('../models/prisma');
const createError = require('../utils/create-error');

const locationController = {};

locationController.createPost = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      image: req.body.image,
    };

    await prisma.locations.create({
      data,
    });

    res.status(201).json({ message: 'location has been created' });
  } catch (err) {
    next(err);
  }
};

locationController.getLocation = async (req, res, next) => {
  try {
    const response = await prisma.locations.findMany();

    res.status(200).json({ locations: response });
  } catch (err) {
    next(err);
  }
};

module.exports = locationController;
