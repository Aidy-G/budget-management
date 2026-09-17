
import {createSlice} from '@reduxjs/toolkit'
import { getDebtCategoryThunk, allCategoriesThunk, getCategoryByNameThunk } from './getCategoriesThunk';
import { addCategoryThunk, updateCategoryThunk } from './categoryThunk';
// import { allDataThunk } from '../AllData/allDataThunk';


const INITIAL_STATE = {
   allCategories : [],
   debtOfCategory : 0.00,
}

export const categorySlice = createSlice({
    name: 'category',

    initialState: INITIAL_STATE,

    reducers:{
       
    },

    extraReducers: (builder)=>{

        // builder.addCase(allDataThunk.fulfilled, (state,action)=>{
        //     state.allCategories = action.payload.categories;
        //     console.log("in the slice  ",state.allCategories);
        // })
        builder.addCase(allCategoriesThunk.fulfilled, (state,action)=>{
            state.allCategories = action.payload;
            console.log("in the slice  ",state.allCategories);
        })
        builder.addCase(getDebtCategoryThunk.fulfilled, (state,action)=>{
             state.debtOfCategory = action.payload
             console.log("in the slice  "+state.debtOfCategory);
        })
        builder.addCase(getCategoryByNameThunk.fulfilled, (state,action)=>{
            // state.allCategories = action.payload
        })
        builder.addCase(addCategoryThunk.fulfilled, (state,action)=>{
            
        })
        builder.addCase(updateCategoryThunk.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.allCategories = state.allCategories.map(category =>
                category.categoryId === action.payload.categoryId ? action.payload : category
            );
        })
    }
});

 export const{extraReducers} = categorySlice.actions;