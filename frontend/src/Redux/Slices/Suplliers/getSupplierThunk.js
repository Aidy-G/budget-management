
import {createAsyncThunk} from '@reduxjs/toolkit'

export const allSupplierThunk = createAsyncThunk(

 'allSupplierThunk',

   async() => {
    
    const response = await fetch(`https://localhost:7086/api/Supplier/Get`);
    
        if(response.ok){

            const data= await response.json();
            
           return data;
        }

        else throw new Error('failed')
        


 }
);

export const getSupplierByNameThunk = createAsyncThunk(

  'getSupplierByNameThunk',
 
    async(name) => {
     
     const response = await fetch(`https://localhost:7086/api/Supplier/GetSupplierByName/${name}`);
     
         if(response.ok){
 
             const data= await response.json();
             
            return data;
         }
 
         else throw new Error('failed')
         
 
 
  }
 );

 export const getSupplierNameByLNumThunk = createAsyncThunk(

  'getSupplierNameByLNumThunk',
 
    async(lNum) => {
     
     const response = await fetch(`https://localhost:7086/api/Supplier/GetSupplierByName/${lNum}`);
     
         if(response.ok){
 
             const data= await response.json();
             
            return data.supplierName;
         }
 
         else throw new Error('failed')
         
 
 
  }
 );
