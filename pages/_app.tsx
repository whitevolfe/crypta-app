import "../styles/globals.css";
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Layout from "../components/layout/AuthenticatedLayout";
import { AuthContextProvider } from "../context/AuthContext/AuthContext";
import { GlobalContextProvider } from "../context/GlobalContext/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <GlobalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
