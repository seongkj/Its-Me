import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [isError, setIsError] = useState(false);

  const onChangeEmail = (e) => setEmail(e.target.value);

  const onHandlePost = async (data) => {
    axios
      .post('http://localhost:3001/users/reset-password', data)
      .then((res) => {
        console.log(res, '성공');
        setResetError(`${email} 로 임시 비밀번호를 발송했습니다`);
      })
      .catch((err) => {
        console.log(err, '실패');
        setResetError('계정 정보를 찾을 수 없습니다');
        setIsError(true);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };

    if (email) onHandlePost(data);
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
            비밀번호 초기화
          </Typography>
          <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
            비밀번호를 초기화하려면 아래에 계정 정보를 입력하세요.
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
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  sx={{ width: '394px' }}
                  value={email}
                  onChange={onChangeEmail}
                />
                {resetError !== '' &&
                  (isError ? (
                    <Alert sx={{ mt: 3 }} severity="error">
                      {<strong>{resetError}</strong>}
                    </Alert>
                  ) : (
                    <Alert sx={{ mt: 3 }} severity="success">
                      {<strong>{resetError}</strong>}
                    </Alert>
                  ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  확인
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
