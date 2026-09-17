import { createAsyncThunk } from "@reduxjs/toolkit";

export const addSchoolThunk = createAsyncThunk(

    'addSchoolThunk',
   
      async(school) => {

      console.log(school);
        const response = await fetch(`https://localhost:7086/api/School/create`,{
        
            
        method:'POST',
        body: JSON.stringify(school),
        headers: {
            'Content-Type': 'application/json'}
        });

       
           if(response.ok){
   
               const data= await response.json();
               console.log(data+" new school");
              return data;
           }
   
           else throw new Error('failed')
           
   
   
    }
   )