// import signup from '../model/auth-model.js';
import * as userModel from '../model/user-model.js';
import { CustomError } from '../middlewares/customError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import statusCode from '../utils/status-code.js';
import responseMessage from '../utils/response-message.js';

dotenv.config();

//회원가입
export async function createUser(userInfo) {
  // id 중복 확인
  const userById = await userModel.findByEmail(userInfo.email);
  if (userById) {
    throw new CustomError(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID);
  }
  const hashedPassword = await bcrypt.hash(userInfo.pw, 10);
  userInfo.pw = hashedPassword;

  return await userModel.create(userInfo);
}

//로그인
export async function login(userInfo) {
  const { email, pw } = userInfo;
  const key = process.env.SECRET_KEY;
  // id확인
  const userById = await userModel.findByEmail(email);
  if (!userById) {
    throw new CustomError(statusCode.NOT_FOUND, responseMessage.NO_USER);
  }
  //정보 확인
  const pwHashed = userById.pw;
  const isPasswordCorrect = await bcrypt.compare(pw, pwHashed);
  if (!isPasswordCorrect) {
    throw new CustomError(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH);
  }
  // 토큰
  const user_idx = userById.user_idx;
  const token = jwt.sign(
    {
      user_idx,
      email,
    },
    key,
    { expiresIn: '2d' }
  ); //payload, secret-key, expiresin
  return { user_idx, token };
}
