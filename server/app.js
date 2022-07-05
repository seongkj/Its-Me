import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
app.get('/', (req, res) => {
  res.send('hello world');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
