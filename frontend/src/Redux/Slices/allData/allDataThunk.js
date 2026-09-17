import {createAsyncThunk} from '@reduxjs/toolkit'

export const allDataThunk = createAsyncThunk(

 'allDataThunk',

   async() => {
    
    const response = await fetch(`https://localhost:7086/GetAllData`);
        if(response.ok){
console.log("allData  "+response);
            const data= await response.json();
           return data;
        }

        else throw new Error('failed')
        


 }
);