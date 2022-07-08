import mysql from 'mysql';
import dbConfig from '../config/config.js';

// 데이터베이스 connection 객체 생성
let connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: Number(dbConfig.PORT),
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: 'utf8mb4',
});

// MySQL connection 실행
connection.connect((error) => {
  if (error) throw error;
  // eslint-disable-next-line no-console
  console.log('MySQL Connected!!!');
});

export default connection;
