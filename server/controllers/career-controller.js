import * as careerService from '../services/career-service.js';

export async function getCareer(req, res, next) {
  try {
    const careerIdx = req.params.career_idx;
    const career = await careerService.findCareerById(careerIdx);
    res.status(200).send({
      status: 200,
      message: '커리어 조회 성공',
      data: career,
    });
  } catch (err) {
    next(err);
  }
}
export async function newCareer(req, res, next) {
  try {
    const newcareer = await careerService.NewCareer(req.body);
    res.status(200).send({
      status: 200,
      message: '커리어 정보 생성',
      data: newcareer,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteCareer(req, res, next) {
  try {
    const careerIdx = req.params.career_idx;
    const deletedcareer = await careerService.deleteCareer(careerIdx);
    console.log(deletedcareer);
    res.status(200).send({
      status: 200,
      message: '커리어 정보 삭제 완료',
      data: deletedcareer,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCareer(req, res, next) {
  try {
    const careerIdx = req.params.career_idx;
    const updated = await careerService.setUser(careerIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '커리어 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
