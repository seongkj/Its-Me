import db from './db.js';

export async function getAwardById(awardIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.award WHERE award_idx = ?',
      awardIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newAward(awardInfo) {
  const { title, award_date, portfolio_idx } = awardInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO award(`title`,`award_date`,`portfolio_idx`) VALUES (?,?,?)',
      [title, award_date, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              award_idx: result.insertId,
              title,
              award_date,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(awardIdx) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM award WHERE award_idx=?', awardIdx, (err, result) => {
      return result.affectedRows == 0
        ? resolve({ error: 'error' })
        : resolve({ result: `${awardIdx} 삭제 완료` });
    });
  });
}

export async function update(awardIdx, awardInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE award SET title=?,award_date=?, portfolio_idx=? WHERE award_idx =?',
      [
        awardInfo.title,
        awardInfo.award_date,
        awardInfo.portfolio_idx,
        awardIdx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve({ awardIdx, ...awardInfo });
      }
    );
  });
}
