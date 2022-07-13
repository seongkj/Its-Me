import db from './db.js';

export async function getLanguageById(languageIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.language WHERE language_idx = ?',
      languageIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newLanguage(languageInfo) {
  console.log(languageInfo);
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO language(`name`,`level`,`test`,`acquisition_date`,`portfolio_idx`) VALUES (?,?,?,?,?)',
      [
        languageInfo.name,
        languageInfo.level,
        languageInfo.test,
        languageInfo.acquisition_date,
        languageInfo.portfolio_idx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function remove(languageIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM language WHERE language_idx=?',
      languageIdx,
      (err, result) => {
        return err ? reject(err) : resolve(languageIdx);
      }
    );
  });
}

export async function update(languageIdx, languageInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE language SET name=?,level=?,test=?, acquisition_date=?, portfolio_idx=? WHERE language_idx =?',
      [
        languageInfo.name,
        languageInfo.level,
        languageInfo.test,
        languageInfo.acquisition_date,
        languageInfo.portfolio_idx,
        languageIdx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve({ languageIdx, ...languageInfo });
      }
    );
  });
}
