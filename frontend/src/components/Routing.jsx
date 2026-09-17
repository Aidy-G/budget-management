
import { Navigate, Route, Routes } from 'react-router-dom';
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

const isUserLoggedIn = (currUser) => {
  return !!currUser && Object.keys(currUser).length > 0 && currUser.schoolSymbol !== -1;
};

const ProtectedRoute = ({ children }) => {
  const currUser = useSelector((state) => state.user.currUser);

  if (!isUserLoggedIn(currUser)) {
    return <Navigate to='/' replace />;
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