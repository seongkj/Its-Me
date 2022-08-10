import * as userService from '../services/user-service.js';
import sendMailer from '../config/email-config.js';
import { CustomError } from '../middlewares/customError.js';
import statusCode from '../utils/status-code.js';
import responseMessage from '../utils/response-message.js';

export async function getUser(req, res, next) {
  try {
    const userIdx = req.params.user_idx;
    const user = await userService.findUserById(userIdx);
    res.status(statusCode.OK).send({
      status: statusCode.OK,
      message: responseMessage.USER_READ_SUCCESS,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
// 비번 받아야함 => 비번 확인하는 과정 있어야함
export async function deleteUser(req, res, next) {
  try {
    const currentUserEmail = req.currentUserEmail;
    const userPw = req.body.pw;
    const userIdx = req.params.user_idx;
    const deletedUser = await userService.deleteUser(
      userIdx,
      userPw,
      currentUserEmail
    );
    res.status(statusCode.OK).send({
      status: statusCode.OK,
      message: responseMessage.USER_DELETE_SUCCESS,
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const userIdx = req.params.user_idx;
    let imageUrl = '';
    let imageKey = '';
    if (req.file) {
      imageUrl = req.file.location;
      imageKey = req.file.key;
      req.body.profile_img = imageUrl;
    } else {
      req.body.profile_img = '';
    }
    const updated = await userService.setUser(userIdx, req.body);
    res.status(statusCode.CREATED).send({
      status: statusCode.CREATED,
      message: responseMessage.USER_UPDATE_SUCCESS,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
//랜덤 문자열
function generaeRandomPassword() {
  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart('0', 8);
}

//비밀번호 재설정
export async function resetPassword(req, res, next) {
  try {
    if (req.body.email == '') {
      throw new CustomError(
        statusCode.BAD_REQUEST,
        responseMessage.EMPTY_EMAIL
      );
    }
    const email = req.body.email;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new CustomError(statusCode.NOT_FOUND, responseMessage.NO_USER);
    }
    const randomPassword = generaeRandomPassword();
    const currentUser = await userService.resetPassword(email, randomPassword);
    await sendMailer(email, randomPassword);
    res.status(statusCode.OK).send({
      status: statusCode.OK,
      message: responseMessage.PASSWORD_RESET_SUCCESS,
      data: currentUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePassword(req, res, next) {
  try {
    const pw = req.body.pw;
    const currentUserEmail = req.currentUserEmail;
    const user = await userService.updatePassword(currentUserEmail, pw);
    res.status(statusCode.OK).send({
      ststus: statusCode.OK,
      message: responseMessage.PASSWORD_UPDATE_SUCCESS,
      data: user,
    });
  } catch (err) {
    return next(err);
  }
}
