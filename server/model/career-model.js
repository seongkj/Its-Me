import db from './db.js';

export async function getCareerById(careerIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.career WHERE career_idx = ?',
      careerIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newCareer(careerInfo) {
  const { company, start_date, end_date, position, comment, portfolio_idx } =
    careerInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO career(`company`,`start_date`,`end_date`,`position`,`comment`,`portfolio_idx`) VALUES (?,?,?,?,?,?)',
      [company, start_date, end_date, position, comment, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              career_idx: result.insertId,
              company,
              start_date,
              end_date,
              position,
              comment,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(careerIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM career WHERE career_idx=?',
      careerIdx,
      (err, result) => {
        return err ? reject(err) : resolve(careerIdx);
      }
    );
  });
}

export async function update(careerIdx, careerInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE career SET company=?,start_date=?,end_date=?,position=?,comment=?, portfolio_idx=? WHERE career_idx =?',
      [
        careerInfo.company,
        careerInfo.start_date,
        careerInfo.end_date,
        careerInfo.position,
        careerInfo.comment,
        careerInfo.portfolio_idx,
        careerIdx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve({ careerIdx, ...careerInfo });
      }
    );
  });
}
