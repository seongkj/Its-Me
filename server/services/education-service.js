import * as educationModel from '../model/education-model.js';

export async function findEducationById(educationIdx) {
  return await educationModel.getEducationById(educationIdx);
}
export async function NewEducation(educationInfo) {
  return await educationModel.newEducation(educationInfo);
}
export async function deleteEducation(educationIdx) {
  return await educationModel.remove(educationIdx);
}

export async function setUser(educationIdx, educationInfo) {
  return await educationModel.update(educationIdx, educationInfo);
}
