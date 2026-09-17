
import {createSlice} from '@reduxjs/toolkit'
import { allExpendituresThunk, getExpenditureByIdThunk } from './getExpendituresThunk';
import { addExpThunk } from './add';



const INITIAL_STATE = {
   allExpenditures : [],
   expenditureById : null

}

export const expenditureSlice = createSlice({
    name: 'expenditure',

    initialState: INITIAL_STATE,

    reducers:{
       
    },

    extraReducers: (builder)=>{
//מוסיף את התנק שהוא קריאת שרת וכך יכול למלא נתונים 
        builder.addCase(allExpendituresThunk.fulfilled, (state,action)=>{
            state.allExpenditures = action.payload;
            console.log("in the slice  ",state.allExpenditures);
        })
        // builder.addCase(allDataThunk.fulfilled, (state,action)=>{
        //     state.allExpenditures = action.payload.expenditures;
        //     console.log("in the slice  ",state.allExpenditures);
        // })
        builder.addCase(getExpenditureByIdThunk.fulfilled, (state,action)=>{
            
            state.expenditureById = action.payload
        }) 
        builder.addCase(addExpThunk.fulfilled, (state,action)=>{
            
            // state.expenditureById = action.payload
            console.log("add a exp...");
        })
        builder.addCase(addExpThunk.rejected, (state,action)=>{
            
            // state.expenditureById = action.payload
            console.log("רק🕳💫💨");
        })
    }
});

export const{extraReducers} = expenditureSlice.actions;