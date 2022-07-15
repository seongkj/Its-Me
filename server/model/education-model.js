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
  const { school, status, major, graduate_date, portfolio_idx } = educationInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO education(`school`,`status`,`major`,`graduate_date`,`portfolio_idx`) VALUES (?,?,?,?,?)',
      [school, status, major, graduate_date, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              education_idx: result.insertId,
              school,
              status,
              major,
              graduate_date,
              portfolio_idx,
            });
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
  const { school, status, major, graduate_date, portfolio_idx } = educationInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE education SET school=?,status=?,major=?, graduate_date=?, portfolio_idx=? WHERE education_idx =?',
      [school, status, major, graduate_date, portfolio_idx, educationIdx],
      (err, result) => {
        return err ? reject(err) : resolve({ educationIdx, ...educationInfo });
      }
    );
  });
}
