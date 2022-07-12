import * as userModel from '../model/user-model.js';

export async function findUserById(userId) {
  return await userModel.findById(userId);
}

export async function deleteUser(userIdx) {
  return await userModel.remove(userIdx);
}

export async function setUser(userIdx, userInfo) {
  return await userModel.update(userIdx, userInfo);
}
