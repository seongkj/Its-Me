import db from './db.js';

async function getUserById(userIdx) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM itsme.user WHERE user_idx = ?`,
      userIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export default getUserById;
