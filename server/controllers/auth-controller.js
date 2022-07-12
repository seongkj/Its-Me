//import * as authService from '../services/auth-service.js';
import createUser from '../services/auth-service.js';

async function signup(req, res, next) {
  try {
    const newUser = await createUser(req.body);
    res.status(201).send({
      status: 201,
      message: '회원가입 성공',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

export default signup;
