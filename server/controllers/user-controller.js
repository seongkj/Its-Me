import * as userService from '../services/user-service.js';
import sendMailer from '../config/email-config.js';

export async function getUser(req, res, next) {
  try {
    const userId = req.params.user_id;
    const user = await userService.findUserById(userId);
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
    // const currentUserIdx = req.currentUserIdx;
    // if(userIdx != currentUserIdx) {

    // }
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
      res.status.send({
        status: 400,
        message: '이메일을 입력해주세요',
      });
    }
    const email = req.body;
    const userIdx = req.currentUserIdx;
    const user = await userService.findUserById(email);
    if (!user) {
      res.status.send({
        status: 404,
        message: '해당 유저가 존재하지 않습니다.',
      });
    }
    const randomPassword = generaeRandomPassword();
    const currentUser = await userService.resetPassword(
      userIdx,
      randomPassword
    );
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
    const currentUserIdx = req.currentUserIdx;
    const user = await userService.updatePassword(
      currentUserEmail,
      currentUserIdx,
      pw
    );
    res.status(200).send({
      ststus: 200,
      message: '비밀번호 재설정 완료',
      data: user,
    });
  } catch (err) {
    return next(err);
  }
}
