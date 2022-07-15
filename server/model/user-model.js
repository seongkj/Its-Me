import db from './db.js';

export async function findById(userId) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.user WHERE user_idx = ?',
      userId,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function findByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM itsme.user WHERE email = ?',
      email,
      (err, result) => {
        return err ? reject(err) : resolve(result[0]);
      }
    );
  });
}

export async function remove(userIdx) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM user WHERE user_idx=?', userIdx, (err, result) => {
      return err ? reject(err) : resolve(userIdx);
    });
  });
}

export async function update(userIdx, userInfo) {
  return new Promise((resolve, reject) => {
    const { email, pw, name, phone, profile_img } = userInfo;
    db.query(
      'UPDATE user SET email=?, name=?, phone=?, profile_img=? WHERE user_idx =?',
      [email, pw, name, phone, profile_img, userIdx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ userIdx, email, name, phone, profile_img });
      }
    );
  });
}

export async function create(userInfo) {
  return new Promise((resolve, reject) => {
    const { email, pw, name, phone, profile_img } = userInfo;
    db.query('INSERT INTO user SET ?', userInfo, (err, result) => {
      return err
        ? reject(err)
        : resolve({
            user_idx: result.user_idx,
            email,
            name,
            phone,
            profile_img,
          });
    });
  });
}

export async function setPassword(userIdx, pw) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE user SET pw = ? WHERE user_idx= ?',
      [pw, userIdx],
      (err, result) => {
        return err ? reject(err) : resolve({ user_idx: userIdx });
      }
    );
  });
}
