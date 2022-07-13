import * as authService from '../services/auth-service.js';

export async function signup(req, res, next) {
  try {
    const newUser = await authService.createUser(req.body);
    res.status(201).send({
      status: 201,
      message: '회원가입 성공',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await authService.login(req.body);
    res.status(200).send({
      status: 200,
      message: '로그인 성공',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
