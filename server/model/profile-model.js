import db from './db.js';

export async function getProfileById(profileIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.profile WHERE profile_idx = ?',
      profileIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function newProfile(profileInfo) {
  const { name, age, phone, email, profile_img, portfolio_idx } = profileInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO profile(`name`,`age`,`phone`,`email`,`profile_img`,`portfolio_idx`) VALUES (?,?,?,?,?,?)',
      [name, age, phone, email, profile_img, portfolio_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              profile_idx: result.insertId,
              name,
              age,
              phone,
              email,
              profile_img,
              portfolio_idx,
            });
      }
    );
  });
}

export async function remove(profileIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM profile WHERE profile_idx=?',
      profileIdx,
      (err, result) => {
        return result.affectedRows == 0
          ? resolve({ error: 'error' })
          : resolve({ result: `${profileIdx} 삭제 완료` });
      }
    );
  });
}

export async function update(profileIdx, profileInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE profile SET name=?, age=?, phone=?, email=?, profile_img=?, portfolio_idx=? WHERE profile_idx =?',
      [
        profileInfo.name,
        profileInfo.age,
        profileInfo.phone,
        profileInfo.email,
        profileInfo.profile_img,
        profileInfo.portfolio_idx,
        profileIdx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve({ profileIdx, ...profileInfo });
      }
    );
  });
}
