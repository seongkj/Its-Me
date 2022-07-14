import * as skillService from '../services/skill-service.js';

export async function getSkill(req, res, next) {
  try {
    const skillIdx = req.params.skill_idx;
    const skill = await skillService.findSkillById(skillIdx);
    res.status(200).send({
      status: 200,
      message: '스킬 조회 성공',
      data: skill,
    });
  } catch (err) {
    next(err);
  }
}
export async function newSkill(req, res, next) {
  try {
    const newskill = await skillService.NewSkill(req.body);
    res.status(200).send({
      status: 200,
      message: '스킬 정보 생성',
      data: newskill,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteSkill(req, res, next) {
  try {
    const skillIdx = req.params.skill_idx;
    const deletedskill = await skillService.deleteSkill(skillIdx);
    console.log(deletedskill);
    res.status(200).send({
      status: 200,
      message: '스킬 정보 삭제 완료',
      data: deletedskill,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateSkill(req, res, next) {
  try {
    const skillIdx = req.params.skill_idx;
    const updated = await skillService.setUser(skillIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '스킬 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
