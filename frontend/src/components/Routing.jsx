
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

import { User } from './User/user';

import { Category } from './Categories/categories';
import { Home } from './home/home';
// import { CollapsibleTable } from './schools/schools';

import { LogIn } from './logIn/logIn';
import { AddExpenditure } from './addExpenditure/addExpenditure';
import { AddSupplier } from './supplier/addSupplier';
import { AddCategory } from './Categories/addCategory';
import { AddSchool } from './schools/addSchool';

import { Main } from './home/main';

import { School } from './schools/schools';
import { Supplier } from './supplier/supplier';
import { Exp } from './Expenditures/exp2';

const getSessionUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const s = sessionStorage.getItem('schoolBudgetSessionUser');
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
};

const isUserLoggedIn = (currUser) => {
  // Prefer session storage user if present
  const sessionUser = getSessionUser();
  const user = sessionUser || currUser;
  if (!user) return false;
  if (typeof user === 'object' && Object.keys(user).length === 0) return false;
  if (user.id !== undefined && user.id !== null) return true;
  if (user.userName) return true;
  if (user.schoolSymbol !== undefined && user.schoolSymbol === -1) return false;
  return false;
};

const RedirectToLoginWithMessage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const navTimer = setTimeout(() => navigate('/', { replace: true }), 1300);
    return () => clearTimeout(navTimer);
  }, [navigate]);

  const handleClose = (event, reason) => {
    // allow close for any reason
    setOpen(false);
    // navigation will occur from the timer above
  };

  return (
    <Snackbar open={open} autoHideDuration={1200} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%', direction: 'rtl' }}>
        עליך להתחבר תחילה למערכת
      </Alert>
    </Snackbar>
  );
};

const ProtectedRoute = ({ children }) => {
  const currUser = useSelector((state) => state.user.currUser);

  if (!isUserLoggedIn(currUser)) {
    return <RedirectToLoginWithMessage />;
  }

  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const currUser = useSelector((state) => state.user.currUser);

  if (isUserLoggedIn(currUser)) {
    return <Navigate to={currUser.schoolSymbol === 0 ? '/home' : '/work'} replace />;
  }

  return children;
};

export const Routing = () => {
  return (
   <Routes>
      <Route path='/' element={<PublicOnlyRoute><LogIn/></PublicOnlyRoute>} />
    
      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path='/expenitures' element={<ProtectedRoute><Exp/></ProtectedRoute>} />
      <Route path='/users' element={<ProtectedRoute><User/></ProtectedRoute>} />
      <Route path='/suppliers' element={<ProtectedRoute><Supplier/></ProtectedRoute>} />
      <Route path='/categories' element={<ProtectedRoute><Category /></ProtectedRoute>} />
      <Route path='/schools' element={<ProtectedRoute><School/></ProtectedRoute>} />
      <Route path='/work' element={<ProtectedRoute><Main/></ProtectedRoute>} />
      <Route path='/addExpenditure' element={<ProtectedRoute><AddExpenditure/></ProtectedRoute>} />
      <Route path='/addCategory' element={<ProtectedRoute><AddCategory/></ProtectedRoute>} />
      <Route path='/addSchool' element={<ProtectedRoute><AddSchool/></ProtectedRoute>} />
      <Route path='/addSupplier' element={<ProtectedRoute><AddSupplier/></ProtectedRoute>} />
      <Route path='/supplier' element={<ProtectedRoute><Supplier/></ProtectedRoute>} />
      </Routes>
   
  );
}