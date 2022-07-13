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
  console.log(profileInfo);
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO profile(`name`,`age`,`phone`,`email`,`profile_img`,`portfolio_idx`) VALUES (?,?,?,?,?,?)',
      [
        profileInfo.name,
        profileInfo.age,
        profileInfo.phone,
        profileInfo.email,
        profileInfo.profile_img,
        profileInfo.portfolio_idx,
      ],
      (err, result) => {
        return err ? reject(err) : resolve(result);
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
        return err ? reject(err) : resolve(profileIdx);
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
