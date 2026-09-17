
import {createSlice} from '@reduxjs/toolkit'
import { alllUsersThunk, allUsersThunk, getUserById } from './getUsersThunk';
import { addUserThunk } from './usersThunk';
// import { allDataThunk } from '../AllData/allDataThunk';




const INITIAL_STATE = {
   allUsers : [],
   alllUsers:[],
   newUser : {},
   currUser :{},

//    שומר קוד משתמש נוכחי
//    checkUser : null
   
}

export const userSlice = createSlice({
    name: 'user',

    initialState: INITIAL_STATE,

    reducers:{
       resetUser: (state) => {
        console.log("cghd77777777777777");
        
        state.currUser= {}
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
            // state.checkUser = action.payload
            // if(action.status==204){
            // state.currUser ='not' 

            // }
            // if(action.status == 200)
             state.currUser = action.payload
            // if(state.checkUser.schoolSymbol == 0000)
                 
        })
        builder.addCase(getUserById.rejected, (state,action)=>{
            state.currUser = undefined
            state.currUser.schoolSymbol = -1
        })
    }
});

 export const{extraReducers,resetUser} = userSlice.actions;
 export default userSlice.reducer;
 