
import {createAsyncThunk} from '@reduxjs/toolkit'

export const allExpendituresThunk = createAsyncThunk(

 'allExpendituresThunk',

   async() => {
    
    const response = await fetch('https://localhost:7086/api/Expenditures/GetAllExpenditures');
        if(response.ok){

            const data= await response.json();
            console.log("dddddd",data);
           return data;
        }

        else throw new Error('failed')
        


 }
);

export const getExpenditureByIdThunk = createAsyncThunk(

    'getExpenditureByIdThunk',
   
      async(id) => {
       
       const response = await fetch(`https://localhost:7086/api/Expenditures/GetExpenditureById/${id}`);
           if(response.ok){
   
               const data= await response.json();
               console.log(data);
              return data;
           }
   
           else throw new Error('failed')
           
   
   
    }
   )
