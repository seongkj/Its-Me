import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Header from '../../components/Header';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        to="/"
        style={{
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        잇츠미
      </Link>{' '}
      {new Date().getFullYear()}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePw = (e) => setPw(e.target.value);

  const onHandlePost = async (data) => {
    axios
      .post('https://elice-its-me.herokuapp.com/auth/login', data)
      .then((res) => {
        console.log(res, '성공');
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('userIdx', res.data.data.user_idx);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoginError('로그인에 실패했습니다.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      pw: pw,
    };

    if (!email) setLoginError('이메일을 입력해주세요');
    if (email && !pw) setLoginError('비밀번호를 입력해주세요');
    if (email && pw) onHandlePost(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 14,
          border: 'solid 1px #bdbdbd',
          borderRadius: '10px',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChangeEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pw"
              label="비밀번호"
              type="password"
              id="pw"
              autoComplete="current-password"
              value={pw}
              onChange={onChangePw}
            />
            {loginError !== '' && (
              <Alert sx={{ mt: 3 }} severity="error">
                {<strong>{loginError}</strong>}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/resetPassword"
                  variant="body2"
                  style={{
                    color: '#aaa',
                    fontSize: '.8rem',
                    textDecoration: 'underline',
                  }}
                >
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/signup"
                  variant="body2"
                  style={{
                    color: '#aaa',
                    fontSize: '.8rem',
                    textDecoration: 'underline',
                  }}
                >
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
