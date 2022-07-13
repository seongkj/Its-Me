import db from './db';

async function create(userInfo) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO user SET ?', userInfo, (err, result) => {
      return err
        ? reject(err)
        : resolve({ user_idx: result.user_idx, ...userInfo });
    });
  });
}

export default create;
