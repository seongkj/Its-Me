import db from './db.js';

export async function getPortfolioById(portfolioIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.portfolio WHERE portfolio_idx = ?',
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newPortfolio(portfolioInfo) {
  console.log(portfolioInfo);
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO portfolio(`template`,`title`,`user_idx`) VALUES (?,?,?)',
      [portfolioInfo.template, portfolioInfo.title, portfolioInfo.user_idx],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function remove(portfolioIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM portfolio WHERE portfolio_idx=?',
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(portfolioIdx);
      }
    );
  });
}

export async function update(portfolioIdx, portfolioInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE portfolio SET template=?,title=?,user_idx=? WHERE portfolio_idx =?',
      [portfolioInfo.template, portfolioInfo.title, portfolioInfo.user_idx],
      (err, result) => {
        return err ? reject(err) : resolve({ portfolioIdx, ...portfolioInfo });
      }
    );
  });
}
