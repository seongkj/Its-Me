import * as websiteModel from '../model/website-model.js';

export async function findWebSiteById(websiteIdx) {
  return await websiteModel.getWebSiteById(websiteIdx);
}
export async function NewWebSite(websiteInfo) {
  return await websiteModel.newWebSite(websiteInfo);
}
export async function deleteWebSite(websiteIdx) {
  return await websiteModel.remove(websiteIdx);
}

export async function setUser(websiteIdx, websiteInfo) {
  return await websiteModel.update(websiteIdx, websiteInfo);
}
