import * as awardService from '../services/award-service.js';

export async function getAward(req, res, next) {
  try {
    const awardIdx = req.params.award_idx;
    const award = await awardService.findAwardById(awardIdx);
    res.status(200).send({
      status: 200,
      message: '어워드 조회 성공',
      data: award,
    });
  } catch (err) {
    next(err);
  }
}
export async function newAward(req, res, next) {
  try {
    const newaward = await awardService.NewAward(req.body);
    res.status(200).send({
      status: 200,
      message: '어워드 정보 생성',
      data: newaward,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteAward(req, res, next) {
  try {
    const awardIdx = req.params.award_idx;
    const deletedaward = await awardService.deleteAward(awardIdx);
    console.log(deletedaward);
    res.status(200).send({
      status: 200,
      message: '어워드 정보 삭제 완료',
      data: deletedaward,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAward(req, res, next) {
  try {
    const awardIdx = req.params.award_idx;
    const updated = await awardService.setUser(awardIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '어워드 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
