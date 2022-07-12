import db from './db.js';

export async function getEducationById(educationIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.education WHERE education_idx = ?',
      educationIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newEducation(educationInfo) {
  console.log(educationInfo);
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO education(`school`,`status`,`major`,`graduate_date`,`portfolio_idx`) VALUES (?,?,?,?,?)',
      [
        educationInfo.school,
        educationInfo.status,
        educationInfo.major,
        educationInfo.graduate_date,
        educationInfo.portfolio_idx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function remove(educationIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM education WHERE education_idx=?',
      educationIdx,
      (err, result) => {
        return err ? reject(err) : resolve(educationIdx);
      }
    );
  });
}

export async function update(educationIdx, educationInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE education SET school=?,status=?,major=?, graduate_date=?, portfolio_idx=? WHERE education_idx =?',
      [
        educationInfo.school,
        educationInfo.status,
        educationInfo.major,
        educationInfo.graduate_date,
        educationInfo.portfolio_idx,
        educationIdx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve({ educationIdx, ...educationInfo });
      }
    );
  });
}
