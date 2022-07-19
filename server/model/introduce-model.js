import db from './db.js';

export async function getIntroduceById(introduceIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.introduce WHERE introduce_idx = ?',
      introduceIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newIntroduce(introduceInfo) {
  console.log(introduceInfo);
  const { comment, portfolio_idx } = introduceInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO introduce(`comment`,`portfolio_idx`) VALUES (?,?)',
      [comment, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              introduce_idx: result.insertId,
              comment,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(introduceIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM introduce WHERE introduce_idx=?',
      introduceIdx,
      (err, result) => {
        return result.affectedRows == 0
          ? resolve({ error: 'error' })
          : resolve({ result: `${introduceIdx} 삭제 완료` });
      }
    );
  });
}

export async function update(introduceIdx, introduceInfo) {
  const { comment, portfolio_idx } = introduceInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE introduce SET comment=?, portfolio_idx=? WHERE introduce_idx =?',
      [comment, portfolio_idx, introduceIdx],
      (err, result) => {
        return err ? reject(err) : resolve({ introduceIdx, ...introduceInfo });
      }
    );
  });
}
