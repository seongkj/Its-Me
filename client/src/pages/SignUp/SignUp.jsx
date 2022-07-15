import React, { useState } from 'react';
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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

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

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePw = (e) => setPw(e.target.value);
  const onChangeConfirmPw = (e) => setConfirmPw(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangePhone = (e) => setPhone(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      pw: pw,
      name: name,
      phone: phone,
      profile_img: null,
    };
    axios
      .post('http://localhost:3001/auth/signup', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
                  label="비밀번호"
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
                />
              </Grid>
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
