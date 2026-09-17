
import {createSlice} from '@reduxjs/toolkit'
import { alllUsersThunk, allUsersThunk, getUserById } from './getUsersThunk';
import { addUserThunk } from './usersThunk';
// import { allDataThunk } from '../AllData/allDataThunk';

const SESSION_STORAGE_KEY = 'schoolBudgetSessionUser';

const getSavedSessionUser = () => {
    if (typeof window === 'undefined') {
        return {};
    }

    try {
        const savedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
        return savedUser ? JSON.parse(savedUser) : {};
    } catch (error) {
        console.error('Error reading saved user session:', error);
        return {};
    }
};

const INITIAL_STATE = {
   allUsers : [],
   alllUsers:[],
   newUser : {},
   currUser : getSavedSessionUser(),

//    שומר קוד משתמש נוכחי
//    checkUser : null
   
}

export const userSlice = createSlice({
    name: 'user',

    initialState: INITIAL_STATE,

    reducers:{
       setUser: (state, action) => {
           state.currUser = action.payload || {};

           if (typeof window !== 'undefined') {
              if (action.payload && Object.keys(action.payload).length > 0) {
                  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(action.payload));
              } else {
                  sessionStorage.removeItem(SESSION_STORAGE_KEY);
              }
           }
       },
       restoreUserFromSession: (state) => {
           const savedUser = getSavedSessionUser();
           state.currUser = savedUser || {};
       },
       resetUser: (state) => {
        state.currUser = {};

        if (typeof window !== 'undefined') {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
    }
    },

    extraReducers: (builder)=>{

        // builder.addCase(allDataThunk.fulfilled, (state,action)=>{

        //     state.allUsers = action.payload.users
        //     console.log("in the slice  ",state.allUsers);
        // })
        builder.addCase(allUsersThunk.fulfilled, (state,action)=>{

            state.allUsers = action.payload
           
        })
        builder.addCase(alllUsersThunk.fulfilled, (state,action)=>{

            state.alllUsers = action.payload
           
        })
        builder.addCase(addUserThunk.fulfilled, (state,action)=>{
            state.newUser = action.payload
        })
        builder.addCase(getUserById.fulfilled, (state,action)=>{
            state.currUser = action.payload || {};
        })
        builder.addCase(getUserById.rejected, (state,action)=>{
            state.currUser = {};
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem(SESSION_STORAGE_KEY);
            }
        })
    }
});

 export const { setUser, restoreUserFromSession, resetUser } = userSlice.actions;
 export default userSlice.reducer;
 