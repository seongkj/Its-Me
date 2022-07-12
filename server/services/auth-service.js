// import signup from '../model/auth-model.js';
import * as userModel from '../model/user-model.js';
import { CustomError } from '../middlewares/customError.js';
import bcrypt from 'bcrypt';

export async function createUser(userInfo) {
  // id 중복 확인
  const userById = await userModel.findById(userInfo.email);
  if (userById) {
    throw new CustomError(400, '이미 가입된 이메일입니다.');
  }
  const hashedPassword = await bcrypt.hash(userInfo.pw, 10);
  userInfo.pw = hashedPassword;

  return await userModel.create(userInfo);
}

export async function login(userInfo) {
  const { email, pw } = userInfo;
  // id확인
  const userById = await userModel.findById(email);
  if (!userById) {
    throw new CustomError(404, '해당 유저가 존재하지 않습니다.');
  }
  //정보 확인
  const pwHashed = userById.pw;
  const isPasswordCorrect = await bcrypt.compare(pw, pwHashed);
  if (!isPasswordCorrect) {
    throw new CustomError(400, '이메일 혹은 비밀번호가 일치하지 않습니다.');
  }
  // 토큰

  return { user_idx: userById.user_idx, token };
}
