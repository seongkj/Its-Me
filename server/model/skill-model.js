import db from './db.js';

export async function getSkillById(skillIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.skill WHERE skill_idx = ?',
      skillIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newSkill(skillInfo) {
  const { name, portfolio_idx } = skillInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO skill(`name`,`portfolio_idx`) VALUES (?,?)',
      [name, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              skill_idx: result.insertId,
              name,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(skillIdx) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM skill WHERE skill_idx=?', skillIdx, (err, result) => {
      return result.affectedRows == 0
        ? resolve({ error: 'error' })
        : resolve({ result: `${skillIdx} 삭제 완료` });
    });
  });
}

export async function update(skillIdx, skillInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE skill SET name=?, portfolio_idx=? WHERE skill_idx =?',
      [skillInfo.name, skillInfo.portfolio_idx, skillIdx],
      (err, result) => {
        return err ? reject(err) : resolve({ skillIdx, ...skillInfo });
      }
    );
  });
}
