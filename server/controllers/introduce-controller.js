import * as introduceService from '../services/introduce-service.js';

export async function getIntroduce(req, res, next) {
  try {
    const introduceIdx = req.params.introduce_idx;
    const introduce = await introduceService.findIntroduceById(introduceIdx);
    res.status(200).send({
      status: 200,
      message: 'introduce 조회 성공',
      data: introduce,
    });
  } catch (err) {
    next(err);
  }
}
export async function newIntroduce(req, res, next) {
  try {
    const newintroduce = await introduceService.NewIntroduce(req.body);
    res.status(200).send({
      status: 200,
      message: 'introduce 정보 생성',
      data: newintroduce,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteIntroduce(req, res, next) {
  try {
    const introduceIdx = req.params.introduce_idx;
    const deletedintroduce = await introduceService.deleteIntroduce(
      introduceIdx
    );
    res.status(200).send({
      status: 200,
      message: 'introduce 정보 삭제 완료',
      data: deletedintroduce,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateIntroduce(req, res, next) {
  try {
    const introduceIdx = req.params.introduce_idx;
    const updated = await introduceService.setUser(introduceIdx, req.body);
    res.status(201).send({
      status: 201,
      message: 'introduce 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
