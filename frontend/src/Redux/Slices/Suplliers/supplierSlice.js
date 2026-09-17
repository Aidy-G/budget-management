import {createSlice} from '@reduxjs/toolkit'
import { allSupplierThunk, getSupplierByNameThunk, getSupplierNameByLNumThunk } from './getSupplierThunk';
import { addSuppThunk, updateSuppThunk } from './suplliersThunk';
// import { allDataThunk } from '../AllData/allDataThunk';



const INITIAL_STATE = {
   allSuppliers : []
}

export const supplierSlice = createSlice({
    name: 'supplier',

    initialState: INITIAL_STATE,

    reducers:{
       
    },

    extraReducers: (builder)=>{

        // builder.addCase(allDataThunk.fulfilled, (state,action)=>{
        //     state.allSuppliers = action.payload.suppliers
        //     console.log("in the slice  ",state.allSuppliers);
        // })
        builder.addCase(allSupplierThunk.fulfilled, (state,action)=>{
            state.allSuppliers = action.payload
            console.log("in the slice  ",state.allSuppliers);
        })

        builder.addCase(getSupplierByNameThunk.fulfilled, (state,action)=>{
        })

        builder.addCase(getSupplierNameByLNumThunk.fulfilled, (state,action)=>{
            console.log(action.payload);
        })
        builder.addCase(addSuppThunk.fulfilled, (state,action)=>{
            console.log(action.payload);
        })
        builder.addCase(addSuppThunk.rejected, (state,action)=>{
            console.log("lui",action.payload);
        })
        builder.addCase(updateSuppThunk.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.allSuppliers = state.allSuppliers.map(supplier =>
                supplier.licensedNum === action.payload.licensedNum ? action.payload : supplier
            );
        })
        builder.addCase(updateSuppThunk.rejected, (state, action) => {
            console.log('supplier update failed', action.payload);
        })
        

    }
});

 export const{extraReducers} = supplierSlice.actions;