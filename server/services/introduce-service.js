import * as introduceModel from '../model/introduce-model.js';

export async function findintroduceById(introduceIdx) {
  return await introduceModel.getIntroduceById(introduceIdx);
}
export async function NewIntroduce(introduceInfo) {
  return await introduceModel.newIntroduce(introduceInfo);
}
export async function deleteIntroduce(introduceIdx) {
  return await introduceModel.remove(introduceIdx);
}

export async function setUser(introduceIdx, introduceInfo) {
  return await introduceModel.update(introduceIdx, introduceInfo);
}
