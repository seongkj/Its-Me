import * as profileModel from '../model/profile-model.js';

export async function findProfileById(profileIdx) {
  return await profileModel.getProfileById(profileIdx);
}
export async function NewProfile(ProfileInfo) {
  return await profileModel.newProfile(ProfileInfo);
}
export async function deleteProfile(profileIdx) {
  return await profileModel.remove(profileIdx);
}

export async function setUser(profileIdx, ProfileInfo) {
  return await profileModel.update(profileIdx, ProfileInfo);
}
