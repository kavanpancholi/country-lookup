import jwt from 'jsonwebtoken';
import { users as userModel } from '../../models';
import { errorResponse, successResponse, uniqueId } from '../../helpers';

/**
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const register = async (req, res) => {
  try {
    const {
      email, password, firstName, lastName,
    } = req.body;
    const user = await userModel.scope('withSecretColumns')
      .findOne({
        where: { email },
      });
    if (user) {
      return errorResponse(req, res, 'User already exists with same email', 400);
    }
    const payload = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      verify_token: uniqueId(),
    };

    await userModel.create(payload);
    const userDetails = await userModel.findOne({
      where: { email },
    });
    return successResponse(req, res, { userDetails });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

/**
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const login = async (req, res) => {
  try {
    const user = await userModel.scope('withSecretColumns')
      .findOne({
        where: { email: req.body.email },
      });
    if (!user || !await user.validPassword(req.body.password, user.password)) {
      return errorResponse(req, res, 'Incorrect Email or Password', 400);
    }
    const token = jwt.sign(
      {
        user: {
          user_id: user.id,
          email: user.email,
          created_at: new Date(),
        },
      },
      process.env.SECRET,
    );
    delete user.dataValues.password;
    return successResponse(req, res, {
      user,
      token,
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

/**
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const changePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.scope('withSecretColumns')
      .findOne({
        where: { id: userId },
      });
    if (!await user.validPassword(req.body.oldPassword, user.password)) {
      return errorResponse(req, res, 'Old password is incorrect', 400);
    }

    await user.update({ password: req.body.newPassword }, { where: { id: user.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
