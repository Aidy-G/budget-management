
import { Route, Routes } from 'react-router-dom';

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

export const Routing = () => {
  
  return (
   <Routes>
      
      <Route path='/' element={<LogIn/>} />  
    
      <Route path='/home' element={<Home/>} />
      <Route path='/expenitures' element={<Exp/>} />
      <Route path='/users' element={<User/>} />
      <Route path='/suppliers' element={<Supplier/>} />
      <Route path='/categories' element={<Category />} />
      <Route path='/schools' element={<School/>} />
      <Route path='/work' element={<Main/>} />
      <Route path='/addExpenditure' element={<AddExpenditure/>} />
      <Route path='/addCategory' element={<AddCategory/>} />
      <Route path='/addSchool' element={<AddSchool/>} />
      <Route path='/addSupplier' element={<AddSupplier/>} />
      <Route path='/supplier' element={<Supplier/>} />
      </Routes>
   
  );
}