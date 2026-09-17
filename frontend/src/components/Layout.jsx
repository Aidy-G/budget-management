import React from 'react';
import { Box } from '@mui/material';
import {Navbar} from './Navbar';
import { useSelector } from "react-redux";

export const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.currUser);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' ,direction:'rtl'}}>
      {user.id != undefined && user.schoolSymbol != -1 && <Navbar/>}
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

