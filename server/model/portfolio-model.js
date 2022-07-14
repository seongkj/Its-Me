import db from './db.js';

export async function getPortfolioById(portfolioIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM itsme.portfolio AS po 
      JOIN itsme.career AS ca
      ON po.portfolio_idx = ca.portfolio_idx 
      JOIN itsme.award AS aw
      ON po.portfolio_idx = aw.portfolio_idx
      JOIN itsme.certificate AS cer
      ON po.portfolio_idx = cer.portfolio_idx
      JOIN itsme.education AS edu
      ON po.portfolio_idx = edu.portfolio_idx
      JOIN itsme.etc_education AS etc
      ON po.portfolio_idx = etc.portfolio_idx
      JOIN itsme.language AS lan
      ON po.portfolio_idx = lan.portfolio_idx
      JOIN itsme.profile AS pro
      ON po.portfolio_idx = pro.portfolio_idx
      JOIN itsme.skill AS ski
      ON po.portfolio_idx = ski.portfolio_idx
      JOIN itsme.website AS web
      ON po.portfolio_idx = web.portfolio_idx
      WHERE po.portfolio_idx = ?`
,
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
