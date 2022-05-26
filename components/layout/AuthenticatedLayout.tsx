import { NextComponentType, NextPageContext } from "next";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/router";

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

const AuthenticatedLayout: NextComponentType<NextPageContext> = ({ children }) => {
  const router = useRouter();
  const currentUrl = router.pathname;
  if (currentUrl === '/') {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <Footer />
    </>
  );
};
export default AuthenticatedLayout;