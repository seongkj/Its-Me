import * as userService from '../services/user-service.js';
import sendMailer from '../config/email-config.js';
import { CustomError } from '../middlewares/customError.js';

export async function getUser(req, res, next) {
  try {
    const userIdx = req.params.user_idx;
    const user = await userService.findUserById(userIdx);
    res.status(200).send({
      status: 200,
      message: '유저 조회 성공',
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
    res.status(200).send({
      status: 200,
      message: '유저 정보 삭제 완료',
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const userIdx = req.params.user_idx;
    const updated = await userService.setUser(userIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '유저 정보 업데이트 완료',
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
      throw new CustomError(400, '이메일을 입력해주세요.');
    }
    const email = req.body.email;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new CustomError(404, '해당 유저가 존재하지 않습니다.');
    }
    const randomPassword = generaeRandomPassword();
    const currentUser = await userService.resetPassword(email, randomPassword);
    await sendMailer(email, randomPassword);
    res.status(200).send({
      status: 200,
      message: '비밀번호 초기화 완료',
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
    res.status(200).send({
      ststus: 200,
      message: '비밀번호 재설정 완료',
      data: user,
    });
  } catch (err) {
    return next(err);
  }
}
