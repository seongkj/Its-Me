import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  try {
    //헤더에 있는 토큰 decode
    const user = jwt.verify(req.headers.authrization, key);
    req.currentUserIdx = user.user_idx;
    req.currentUserEmail = user.email;
    return next();
  } catch (err) {
    //토큰 만료
    if (error.name === 'TokenExpiredError') {
      return res.status(419).send({
        status: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    // 토큰 비밀키 불일치
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({
        status: 401,
        message: '유효하지 않은 토큰입니다.',
      });
    }
  }
};

export default auth;
