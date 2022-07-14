import * as etc_educationModel from '../model/etc_education-model.js';

export async function findEtc_educationById(etc_educationIdx) {
  return await etc_educationModel.getEtc_educationById(etc_educationIdx);
}
export async function NewEtc_education(etc_educationInfo) {
  return await etc_educationModel.newEtc_education(etc_educationInfo);
}
export async function deleteEtc_education(etc_educationIdx) {
  return await etc_educationModel.remove(etc_educationIdx);
}

export async function setUser(etc_educationIdx, etc_educationInfo) {
  return await etc_educationModel.update(etc_educationIdx, etc_educationInfo);
}
