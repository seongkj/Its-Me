import * as skillModel from '../model/skill-model.js';

export async function findSkillById(skillIdx) {
  return await skillModel.getSkillById(skillIdx);
}
export async function NewSkill(skillInfo) {
  return await skillModel.newSkill(skillInfo);
}
export async function deleteSkill(skillIdx) {
  return await skillModel.remove(skillIdx);
}

export async function setUser(skillIdx, skillInfo) {
  return await skillModel.update(skillIdx, skillInfo);
}
