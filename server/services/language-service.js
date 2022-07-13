import * as languageModel from '../model/language-model.js';

export async function findLanguageById(languageIdx) {
  return await languageModel.getLanguageById(languageIdx);
}
export async function NewLanguage(languageInfo) {
  return await languageModel.newLanguage(languageInfo);
}
export async function deleteLanguage(languageIdx) {
  return await languageModel.remove(languageIdx);
}

export async function setUser(languageIdx, languageInfo) {
  return await languageModel.update(languageIdx, languageInfo);
}
