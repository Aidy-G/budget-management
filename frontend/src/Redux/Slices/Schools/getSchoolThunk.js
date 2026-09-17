
import {createAsyncThunk} from '@reduxjs/toolkit'

export const allSchoolsThunk = createAsyncThunk(

 'allSchoolsThunk',

   async() => {

    const response = await fetch(`https://localhost:7086/api/School`);
        if(response.ok){

            const data= await response.json();
            console.log(data);
           return data;
        }

        else throw new Error('failed')
        


 }
);
export const getExpendituresOfSchool = createAsyncThunk(

  'getExpendituresOfSchool',
 
    async(schoolSymbol) => {
     
     const response = await fetch(`https://localhost:7086/api/School/GetExpenditures/${schoolSymbol}`);
         if(response.ok){
 
             const data= await response.json();
             console.log("Expenditures data from server:", data);
            return data;
         }
 
         else throw new Error('failed')
         
  }
 ) 
 export const getSchoolBySsymbolThunk = createAsyncThunk(

  'getSchoolBySsymbolThunk',
 
    async(schoolSymbol) => {
     
     const response = await fetch(`https://localhost:7086/api/School/GetSchoolBySymbol/${schoolSymbol}`);
         if(response.ok){
 
             const data= await response.json();

            return data;
         }
 
         else throw new Error('failed')
         
  }
 ) 


export const getDebtOfSchool = createAsyncThunk(

  'getDebtOfSchool',
 
    async(name) => {
     
     const response = await fetch(`https://localhost:7086/api/School/GetDebtOfSchool/${name}`);
         if(response.ok){
 
             const data= await response.json();
              console.log(data+"חוןלחן");
            return data;
         }
 
         else throw new Error('failed')
         
  }
 )  
 export const getTotalSumOfSchool = createAsyncThunk(

  'getTotalSumOfSchool',
 
    async(schoolSymbol) => {
      if (schoolSymbol === undefined || schoolSymbol === null) {
        return 0;
      }
     
     const response = await fetch(`https://localhost:7086/api/School/GetSumOfEpendituresOfSchool/${schoolSymbol}`);
         if(response.ok){
 
             const data= await response.json();

            return Number(data) || 0;
         }
 
         else throw new Error('failed')
         
  }
 ) 
  export const GetSumOfEpendituresOfSchool = createAsyncThunk(

  'GetSumOfEpendituresOfSchool',
 
    async(schoolSymbol) => {
      if (schoolSymbol === undefined || schoolSymbol === null) {
        return 0;
      }
     
     const response = await fetch(`https://localhost:7086/api/School/GetSumOfEpendituresOfSchool/${schoolSymbol}`);
         if(response.ok){
 
             const data= await response.json();

            return Number(data) || 0;
         }
 
         else throw new Error('failed')
         
 
 
  }
 )  