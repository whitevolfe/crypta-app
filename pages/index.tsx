/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useAuthContext from "../context/AuthContext/AuthContext";
import Login from '../components/login'
import Register from '../components/SignUp'
import { SSRProps } from "../utils/ssrProps";

export default function page() {
  const { loading } = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginRegister = () => {
    setIsLogin(!isLogin);
  }

  if (loading) {
    return <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>;
  }

  if (isLogin) return <Login onClick={handleLoginRegister} />
  else return <Register onClick={handleLoginRegister} />

}

SSRProps(page, "");
