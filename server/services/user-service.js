import * as userModel from '../model/user-model.js';
import bcrypt from 'bcrypt';
import { CustomError } from '../middlewares/customError.js';

export async function findUserById(userId) {
  return await userModel.findById(userId);
}

export async function deleteUser(userIdx, pw, email) {
  const userById = await userModel.findByEmail(email);
  if (!userById) {
    throw new CustomError(404, '해당 유저가 존재하지 않습니다.');
  }
  //정보 확인
  const pwHashed = userById.pw;
  const isPasswordCorrect = await bcrypt.compare(pw, pwHashed);
  if (!isPasswordCorrect) {
    throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
  }
  return await userModel.remove(userIdx);
}

export async function setUser(userIdx, userInfo) {
  return await userModel.update(userIdx, userInfo);
}

export async function resetPassword(userIdx, pw) {
  const hashedPassword = await bcrypt.hash(pw, 10);
  return await userModel.setPassword(userIdx, hashedPassword);
}

export async function updatePassword(idx, pw) {
  const hashedPassword = await bcrypt.hash(pw, 10);
  return userModel.setPassword(idx, hashedPassword);
}
