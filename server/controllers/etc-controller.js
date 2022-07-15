import * as etc_educationService from '../services/etc_education-service.js';

export async function getEtc_education(req, res, next) {
  try {
    const etc_educationIdx = req.params.etc_education_idx;
    const etc_education = await etc_educationService.findEtc_educationById(
      etc_educationIdx
    );
    res.status(200).send({
      status: 200,
      message: 'ETC에듀케이션 조회 성공',
      data: etc_education,
    });
  } catch (err) {
    next(err);
  }
}
export async function newEtc_education(req, res, next) {
  try {
    const newetc_education = await etc_educationService.NewEtc_education(
      req.body
    );
    res.status(200).send({
      status: 200,
      message: 'ETC에듀케이션 정보 생성',
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteEtc_education(req, res, next) {
  try {
    const etc_educationIdx = req.params.etc_education_idx;
    const deletedetc_education = await etc_educationService.deleteEtc_education(
      etc_educationIdx
    );
    console.log(deletedetc_education);
    res.status(200).send({
      status: 200,
      message: 'ETC에듀케이션 정보 삭제 완료',
      data: deletedetc_education,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateEtc_education(req, res, next) {
  try {
    const etc_educationIdx = req.params.etc_education_idx;
    const updated = await etc_educationService.setUser(
      etc_educationIdx,
      req.body
    );
    res.status(201).send({
      status: 201,
      message: 'ETC에듀케이션 정보 업데이트 완료',
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
}
