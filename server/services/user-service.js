import * as userModel from '../model/user-model.js';
import bcrypt from 'bcrypt';
import { CustomError } from '../middlewares/customError.js';
import statusCode from '../utils/status-code.js';
import responseMessage from '../utils/response-message.js';

export async function findUserById(userIdx) {
  return await userModel.findById(userIdx);
}
export async function findUserByEmail(email) {
  return await userModel.findByEmail(email);
}
export async function deleteUser(userIdx, pw, email) {
  const userById = await userModel.findByEmail(email);
  if (!userById) {
    throw new CustomError(statusCode.NOT_FOUND, responseMessage.NO_USER);
  }
  //정보 확인
  const pwHashed = userById.pw;
  const isPasswordCorrect = await bcrypt.compare(pw, pwHashed);
  if (!isPasswordCorrect) {
    throw new CustomError(
      statusCode.BAD_REQUEST,
      responseMessage.MISS_MATCH_PW
    );
  }
  return await userModel.remove(userIdx);
}

export async function setUser(userIdx, userInfo) {
  return await userModel.update(userIdx, userInfo);
}

export async function resetPassword(email, pw) {
  const hashedPassword = await bcrypt.hash(pw, 10);
  return await userModel.setPassword(email, hashedPassword);
}

export async function updatePassword(email, pw) {
  const hashedPassword = await bcrypt.hash(pw, 10);
  return userModel.setPassword(email, hashedPassword);
}
