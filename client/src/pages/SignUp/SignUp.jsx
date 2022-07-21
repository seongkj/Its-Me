import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import styled from 'styled-components';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        잇츠미
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pwError, setPwError] = useState('');
  const [signupError, setSignupError] = useState('');

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePw = (e) => setPw(e.target.value);
  const onChangeConfirmPw = (e) => setConfirmPw(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangePhone = (e) => setPhone(e.target.value);

  const navigate = useNavigate();

  const onHandlePost = async (data) => {
    axios
      .post('http://localhost:3001/auth/signup', data)
      .then((res) => {
        console.log(res, '성공');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setSignupError('이미 가입된 이메일입니다');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      pw: pw,
      name: name,
      phone: phone,
      profile_img: null,
    };

    if (!name) setSignupError('이름을 입력해주세요');
    if (name && !email) setSignupError('이메일을 입력해주세요');
    if (name && email && !pw) setSignupError('비밀번호를 입력해주세요');

    if (pw !== confirmPw) setSignupError('비밀번호가 일치하지 않습니다');

    if (name && email && pw === confirmPw && pw.length > 0 && !phone)
      setSignupError('연락처를 입력해주세요');
    else setSignupError('입력한 정보를 다시 확인해주세요');

    if (pw.length >= 6 && pw === confirmPw) {
      onHandlePost(data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 6,
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
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={onChangeName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pw"
                  label="비밀번호 (6자리 이상)"
                  type="password"
                  id="pw"
                  autoComplete="new-password"
                  value={pw}
                  onChange={onChangePw}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPw"
                  label="비밀번호 확인"
                  type="password"
                  id="confirmPw"
                  autoComplete="new-password"
                  value={confirmPw}
                  onChange={onChangeConfirmPw}
                  error={pwError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{pwError}</FormHelperTexts>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="연락처"
                  type="text"
                  id="phone"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={onChangePhone}
                />
              </Grid>
            </Grid>
            {signupError !== '' && (
              <Alert sx={{ mt: 3 }} severity="error">
                {<strong>{signupError}</strong>}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              계정 생성
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 회원이라면? 로그인
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
