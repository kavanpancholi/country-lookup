import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as countryController from '../controllers/user/country.controller';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.post(
  '/changePassword',
  validate(userValidator.changePassword),
  userController.changePassword,
);
router.get(
  '/countries/:keyword',
  countryController.countries,
);

module.exports = router;
