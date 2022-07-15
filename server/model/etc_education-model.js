import db from './db.js';

export async function getEtc_educationById(etc_educationIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.etc_education WHERE etc_education_idx = ?',
      etc_educationIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newEtc_education(etc_educationInfo) {
  const { title, organization, start_date, end_date, comment, portfolio_idx } =
    etc_educationInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO etc_education(`title`,`organization`,`start_date`,`end_date`,`comment`,`portfolio_idx`) VALUES (?,?,?,?,?,?)',
      [title, organization, start_date, end_date, comment, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              etc_education_idx: result.insertId,
              title,
              organization,
              start_date,
              end_date,
              comment,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(etc_educationIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM etc_education WHERE etc_education_idx=?',
      etc_educationIdx,
      (err, result) => {
        return err ? reject(err) : resolve(etc_educationIdx);
      }
    );
  });
}

export async function update(etc_educationIdx, etc_educationInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE etc_education SET title=?,organization=?,start_date=?,end_date=?, comment=?, portfolio_idx=? WHERE etc_education_idx =?',
      [
        etc_educationInfo.title,
        etc_educationInfo.organization,
        etc_educationInfo.start_date,
        etc_educationInfo.end_date,
        etc_educationInfo.comment,
        etc_educationInfo.portfolio_idx,
        etc_educationIdx,
      ],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ etc_educationIdx, ...etc_educationInfo });
      }
    );
  });
}
