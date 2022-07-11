import * as userService from '../services/user-service.js';

export async function getUser(req, res, next) {
  try {
    const userIdx = req.params.user_idx;
    const user = await userService.findUserById(userIdx);
    res.status(200).send({
      status: 200,
      message: '유저 조회 성공',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const userIdx = req.params.user_idx;
    const deletedUser = await userService.deleteUser(userIdx);
    console.log(deletedUser);
    res.status(200).send({
      status: 200,
      message: '유저 정보 삭제 완료',
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
}
