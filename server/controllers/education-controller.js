import * as educationService from '../services/education-service.js';

export async function getEducation(req, res, next) {
  try {
    const educationIdx = req.params.education_idx;
    const education = await educationService.findEducationById(educationIdx);
    res.status(200).send({
      status: 200,
      message: '에듀케이션 조회 성공',
      data: education,
    });
  } catch (err) {
    next(err);
  }
}
export async function newEducation(req, res, next) {
  try {
    const neweducation = await educationService.NewEducation(req.body);
    res.status(200).send({
      status: 200,
      message: '에듀케이션 정보 생성',
      data: neweducation,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteEducation(req, res, next) {
  try {
    const educationIdx = req.params.education_idx;
    const deletededucation = await educationService.deleteEducation(
      educationIdx
    );
    res.status(200).send({
      status: 200,
      message: '에듀케이션 정보 삭제 완료',
      data: deletededucation,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateEducation(req, res, next) {
  try {
    const educationIdx = req.params.education_idx;
    const updated = await educationService.setUser(educationIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '에듀케이션 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
