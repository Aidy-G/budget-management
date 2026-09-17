
import {createAsyncThunk} from '@reduxjs/toolkit'

export const allUsersThunk = createAsyncThunk(

 'allUsersThunk',

   async() => {

    const response = await fetch(`https://localhost:7086/api/User`);
        if(response.ok){

            const data= await response.json();
            console.log(data);
           return data;
        }

        else throw new Error('failed')
        


 }
);
export const alllUsersThunk = createAsyncThunk(

 'alllUsersThunk',

   async() => {

    const response = await fetch(`https://localhost:7086/api/User/getAllUsers
`);
        if(response.ok){

            const data= await response.json();
            console.log(data);
           return data;
        }

        else throw new Error('failed')
        


 }
);
export const getUserById = createAsyncThunk(

  'getUserById',
 
    async(id) => {
 
     const response = await fetch(`https://localhost:7086/api/User/${id}`);
         if(response.ok){
 
             const data= await response.json();
             console.log(data);
             return data;
         }
        //  else if(response.status == 400){
        //   console.log("fdrgseygu");
        //   return null;
        //  }
         else throw new Error('failed')
         
 
 
  }
 )