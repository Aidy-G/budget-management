
import {createSlice} from '@reduxjs/toolkit'
import { allExpendituresThunk, getExpenditureByIdThunk } from './getExpendituresThunk';
import { addExpThunk } from './expenditureThunk';
import { updateExpenditureThunk } from './expenditureThunk';


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
            // When an expenditure is successfully added, append it to the cached list
            if (!state.allExpenditures) state.allExpenditures = [];
            try {
                state.allExpenditures.push(action.payload);
            } catch (e) {
                console.error('Failed to append new expenditure to state.allExpenditures', e);
            }
            console.log("add a exp...");
        })
        builder.addCase(addExpThunk.rejected, (state,action)=>{
            
            // state.expenditureById = action.payload
            console.log("רק🕳💫💨");
        })
        builder.addCase(updateExpenditureThunk.fulfilled, (state,action)=>{
            // Update the cached expenditure in allExpenditures if present
            try {
                const updated = action.payload;
                if (state.allExpenditures && updated && updated.id !== undefined) {
                    const idx = state.allExpenditures.findIndex(e => e.id === updated.id);
                    if (idx !== -1) {
                        state.allExpenditures[idx] = {
                            ...state.allExpenditures[idx],
                            ...updated
                        };
                    }
                }
            } catch (e) {
                console.error('Failed to update expenditure in state.allExpenditures', e);
            }
            console.log("update a exp...");
        })
        builder.addCase(updateExpenditureThunk.rejected, (state,action)=>{
            console.log("update rejected");
        })

        
    }
});

export const{extraReducers} = expenditureSlice.actions;