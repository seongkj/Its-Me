import * as userModel from '../model/user-model.js';

export async function findUserById(userIdx) {
  return await userModel.getUserById(userIdx);
}

export async function deleteUser(userIdx) {
  const user = await userModel.remove(userIdx);
  console.log('service:', user);
  return user;
}
