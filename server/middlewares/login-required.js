import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const loginrequired = (req, res, next) => {
  const accessToken = req.headers['authorization']?.split(' ')[1];
  if (!accessToken || accessToken === 'null') {
    res.status(401).send({
      result: 'forbidden-approach',
      message: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  try {
    //헤더에 있는 토큰 decode
    const key = process.env.SECRET_KEY;
    const user = jwt.verify(accessToken, key);
    req.currentUserIdx = user.user_idx;
    req.currentUserEmail = user.email;
    next();
  } catch (err) {
    //토큰 만료
    // if (err.name === 'TokenExpiredError') {
    //   return res.status(419).send({
    //     status: 419,
    //     message: '토큰이 만료되었습니다.',
    //   });
    // }
    // // 토큰 비밀키 불일치
    // if (err.name === 'JsonWebTokenError') {
    //   return res.status(401).send({
    //     status: 401,
    //     message: '유효하지 않은 토큰입니다.',
    //   });
    res.send({ errorMessage: err + ' : 로그인이 필요합니다.' });
    // }
  }
};

export default loginrequired;
