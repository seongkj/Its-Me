import * as authService from '../services/auth-service.js';
import statusCode from '../utils/status-code.js';
import responseMessage from '../utils/response-message.js';

export async function signup(req, res, next) {
  try {
    const newUser = await authService.createUser(req.body);
    res.status(statusCode.CREATED).send({
      status: statusCode.CREATED,
      message: responseMessage.SIGN_UP_SUCCESS,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await authService.login(req.body);
    res.status(statusCode.OK).send({
      status: statusCode.OK,
      message: responseMessage.SIGN_IN_SUCCESS,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
