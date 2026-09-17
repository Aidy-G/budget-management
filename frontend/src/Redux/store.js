import {  combineSlices,configureStore  } from '@reduxjs/toolkit';
import { schoolSlice } from "./Slices/Schools/schoolSlice";
import { categorySlice } from './Slices/Categories/categorySlice';
import { expenditureSlice} from './Slices/Expenditures/expenditureSlice'
import { supplierSlice } from './Slices/Suplliers/supplierSlice';
import { userSlice } from './Slices/Users/userSlice';
import { paymentsSlice } from './Slices/Payments/paymentsSlice';


const reducers = combineSlices(schoolSlice,categorySlice,expenditureSlice,supplierSlice,
                                userSlice,paymentsSlice);

export const STORE = configureStore({
    reducer:reducers
});

