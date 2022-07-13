import * as certificateService from '../services/certificate-service.js';

export async function getCertificate(req, res, next) {
  try {
    const certificateIdx = req.params.certificate_idx;
    const certificate = await certificateService.findCertificateById(
      certificateIdx
    );
    res.status(200).send({
      status: 200,
      message: '증명서 조회 성공',
      data: certificate,
    });
  } catch (err) {
    next(err);
  }
}
export async function newCertificate(req, res, next) {
  try {
    const newcertificate = await certificateService.NewCertificate(req.body);
    res.status(200).send({
      status: 200,
      message: '증명서 정보 생성',
      data: newcertificate,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteCertificate(req, res, next) {
  try {
    const certificateIdx = req.params.certificate_idx;
    const deletedcertificate = await certificateService.deletecertificate(
      certificateIdx
    );
    console.log(deletedcertificate);
    res.status(200).send({
      status: 200,
      message: '증명서 정보 삭제 완료',
      data: deletedcertificate,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCertificate(req, res, next) {
  try {
    const certificateIdx = req.params.certificate_idx;
    const updated = await certificateService.setUser(certificateIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '증명서 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
