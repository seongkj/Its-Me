import * as careerModel from '../model/career-model.js';

export async function findCareerById(careerIdx) {
  return await careerModel.getCareerById(careerIdx);
}
export async function NewCareer(careerInfo) {
  return await careerModel.newCareer(careerInfo);
}
export async function deleteCareer(careerIdx) {
  return await careerModel.remove(careerIdx);
}

export async function setUser(careerIdx, careerInfo) {
  return await careerModel.update(careerIdx, careerInfo);
}
