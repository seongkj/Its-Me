import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
  charset: 'utf8mb4',
});

// MySQL connection 실행
connection.connect((error) => {
  if (error) throw error;
  // eslint-disable-next-line no-console
  console.log('MySQL Connected!!!', 'db.js');
});

export default connection;
