import db from './db.js';

export async function getWebSiteById(websiteIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.website WHERE website_idx = ?',
      websiteIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newWebSite(websiteInfo) {
  const {
    title,
    link,
    comment,
    thumbnail,
    start_date,
    end_date,
    portfolio_idx,
  } = websiteInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO website(`title`,`link`,`comment`,`thumbnail`,`start_date`,`end_date`,`portfolio_idx`) VALUES (?,?,?,?,?,?,?)',
      [title, link, comment, thumbnail, start_date, end_date, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              website_idx: result.insertId,
              title,
              link,
              comment,
              thumbnail,
              start_date,
              end_date,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(websiteIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM website WHERE website_idx=?',
      websiteIdx,
      (err, result) => {
        return result.affectedRows == 0
          ? resolve({ error: 'error' })
          : resolve({ result: `${websiteIdx} 삭제 완료` });
      }
    );
  });
}

export async function update(websiteIdx, websiteInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE website SET title=?, link=?,comment=?,thumbnail=?,start_date=?,end_date=?, portfolio_idx=? WHERE website_idx =?',
      [
        websiteInfo.title,
        websiteInfo.link,
        websiteInfo.comment,
        websiteInfo.thumbnail,
        websiteInfo.start_date,
        websiteInfo.end_date,
        websiteInfo.portfolio_idx,
        websiteIdx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve({ websiteIdx, ...websiteInfo });
      }
    );
  });
}
