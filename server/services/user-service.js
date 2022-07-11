import getUserById from '../model/user-model.js';

async function findUserById(userIdx) {
  return await getUserById(userIdx);
}

export default findUserById;
