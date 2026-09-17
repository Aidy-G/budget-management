
import {createAsyncThunk} from '@reduxjs/toolkit'

export const addUserThunk = createAsyncThunk(

    'addUserThunk',
   
      async(user) => {

      console.log(user);
        const response = await fetch("https://localhost:7086/api/User/create",{
            
        method:'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'}
        });

       
           if(response.ok){
   
               const data= await response.json();
               console.log(data+" new user");
              return data;
           }
   
           else throw new Error('failed')
           
   
   
    }
   )

   
