import db from './db.js';

export async function getPortfolioById(portfolioIdx) {
  const portfolio_json = {};
  // award 수집
  const award_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.award WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['award'] = award_data;
  // career 수집
  const career_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.career WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['career'] = career_data;
  // certificate 수집
  const certificate_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.certificate WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['certificate'] = certificate_data;
  // education 수집
  const education_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.education WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['education'] = education_data;
  // etc_education 수집
  const etc_education_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.etc_education WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['etc_education'] = etc_education_data;
  // language 수집
  const language_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.language WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['language'] = language_data;
  // profile 수집
  const profile_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.profile WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['profile'] = profile_data;
  // skill 수집
  const skill_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.skill WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['skill'] = skill_data;
  // website 수집
  const website_data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.website WHERE portfolio_idx = ?`,
      portfolioIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
  portfolio_json['website'] = website_data;
  return portfolio_json;
}

export async function newPortfolio(portfolioInfo) {
  const { template, title, user_idx } = portfolioInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO portfolio(`template`,`title`,`user_idx`) VALUES (?,?,?)',
      [template, title, user_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              portfolio_idx: result.insertId,
              template,
              title,
              user_idx,
            });
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
