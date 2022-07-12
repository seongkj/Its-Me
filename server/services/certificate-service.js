import * as certificateModel from '../model/certificate-model.js';

export async function findCertificateById(certificateIdx) {
  return await certificateModel.getCertificateById(certificateIdx);
}
export async function NewCertificate(certificateInfo) {
  return await certificateModel.newCertificate(certificateInfo);
}
export async function deleteCertificate(certificateIdx) {
  return await certificateModel.remove(certificateIdx);
}

export async function setUser(certificateIdx, certificateInfo) {
  return await certificateModel.update(certificateIdx, certificateInfo);
}
