import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRouter from './routes/user-router.js';
import introduceRouter from './routes/introduce-router.js';
import authRouter from './routes/auth-router.js';
import ProfileRoute from './routes/profile-router.js';
import skillRoute from './routes/skill-router.js';
import websiteRoute from './routes/website-router.js';
import awardRoute from './routes/award-router.js';
import careerRoute from './routes/career-router.js';
import certificateRoute from './routes/certificate-router.js';
import educationRoute from './routes/education-router.js';
import etc_educationRoute from './routes/etc_education-router.js';
import languageRoute from './routes/language-router.js';
import portfolioRoute from './routes/portfolio-router.js';

const app = express();
const port = process.env.PORT || 3001;
import morgan from 'morgan';
app.use(morgan('dev'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//라우터 연결

app.use('/profiles', ProfileRoute);
app.use('/skills', skillRoute);
app.use('/introduces', introduceRouter);
app.use('/websites', websiteRoute);
app.use('/awards', awardRoute);
app.use('/careers', careerRoute);
app.use('/certificates', certificateRoute);
app.use('/educations', educationRoute);
app.use('/etc_educations', etc_educationRoute);
app.use('/languages', languageRoute);
app.use('/portfolios', portfolioRoute);

app.use('/users', userRouter);
app.use('/auth', authRouter);

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('hello world');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
