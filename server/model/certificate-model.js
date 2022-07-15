import db from './db.js';

export async function getCertificateById(certificateIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.certificate WHERE certificate_idx = ?',
      certificateIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newCertificate(certificateInfo) {
  const { title, organization, acquisition_date, portfolio_idx } =
    certificateInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO certificate(`title`,`organization`,`acquisition_date`,`portfolio_idx`) VALUES (?,?,?,?)',
      [title, organization, acquisition_date, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              certificate_idx: result.insertId,
              title,
              organization,
              acquisition_date,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(certificateIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM certificate WHERE certificate_idx=?',
      certificateIdx,
      (err, result) => {
        return err ? reject(err) : resolve(certificateIdx);
      }
    );
  });
}

export async function update(certificateIdx, certificateInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE certificate SET title=?,organization=?,acquisition_date=?, portfolio_idx=? WHERE certificate_idx =?',
      [
        certificateInfo.title,
        certificateInfo.organization,
        certificateInfo.acquisition_date,
        certificateInfo.portfolio_idx,
        certificateIdx,
      ],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ certificateIdx, ...certificateInfo });
      }
    );
  });
}
