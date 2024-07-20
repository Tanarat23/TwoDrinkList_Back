const express = require('express');
const locationController = require('../controllers/location-controller');
const { locationValidator } = require('../middlewares/validator');

const locationRouter = express.Router();

locationRouter.post('/', locationValidator, locationController.createPost);
locationRouter.get('/', locationController.getLocation);

module.exports = locationRouter;
