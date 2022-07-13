import * as awardModel from '../model/award-model.js';

export async function findAwardById(awardIdx) {
  return await awardModel.getAwardById(awardIdx);
}
export async function NewAward(awardInfo) {
  return await awardModel.newAward(awardInfo);
}
export async function deleteAward(awardIdx) {
  return await awardModel.remove(awardIdx);
}

export async function setUser(awardIdx, awardInfo) {
  return await awardModel.update(awardIdx, awardInfo);
}
