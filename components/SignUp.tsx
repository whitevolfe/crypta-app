import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Warning from '@mui/icons-material/Warning';

import useAuthContext from '../context/AuthContext/AuthContext'
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
});

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link href="https://www.kinit.lk/">
        KINIT
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface IProps {
  onClick: () => void;
}


export default function SignUp({ onClick }: IProps) {
  const { register, error, resetError } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      register(email, password);
    },
    validationSchema: schema,
  });

  const handleOnChange = (e: any) => {
    formik.handleChange(e);
    resetError();
  }

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleOnChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleOnChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="I have read the Terms and Conditions"
          />
          {error && error['type'] === "LOGIN_FAILED" && <Box
            sx={{
              height: 35,
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              alignItems: 'center',
              display: 'flex',
              padding: "0 5px",
              borderRadius: "5px",
            }}
          >
            <Warning
              sx={{
                color: 'red',
              }}
            />
            <Typography variant="body2" color="red" align="center">   &nbsp;  {error['data']['message']}</Typography>
          </Box>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <div onClick={onClick}
                style={{ cursor: "pointer" }}
              >
                Already have an account? Sign in
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}