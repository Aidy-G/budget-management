
import {createSlice} from '@reduxjs/toolkit'



const INITIAL_STATE = {
   allData : [],
   

}

export const allDataSlice = createSlice({
    name: 'allData',

    initialState: INITIAL_STATE,

    reducers:{
       
    },

    extraReducers: (builder)=>{
//מוסיף את התנק שהוא קריאת שרת וכך יכול למלא נתונים 
        
}});

export const{extraReducers} = allDataSlice.actions;