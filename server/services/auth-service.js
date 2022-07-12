// import signup from '../model/auth-model.js';
import * as userModel from '../model/user-model.js';
import { CustomError } from '../middlewares/customError.js';
import bcrypt from 'bcrypt';

async function createUser(userInfo) {
  // id 중복 확인
  const userById = await userModel.findById(userInfo.email);
  if (!userById) {
    throw new CustomError(400, '존재하지 않는 아이디입니다.');
  }
  const hashedPassword = await bcrypt.hash(userInfo.pw, 10);
  userInfo.pw = hashedPassword;

  return await userModel.create(userInfo);
}

export default createUser;
