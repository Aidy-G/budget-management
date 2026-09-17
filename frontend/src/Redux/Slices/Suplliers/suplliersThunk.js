import {createAsyncThunk} from '@reduxjs/toolkit'



export const addSuppThunk = createAsyncThunk(

    'addSuppThunk',
   
      async(supp) => {

      console.log(supp);
        const response = await fetch(`https://localhost:7086/api/Supplier`,{
            
        method:'POST',
        body: JSON.stringify(supp),
        headers: {
            'Content-Type': 'application/json'}
        });

       
           if(response.ok){
   
               const data= await response.json();
               console.log(data+" new supp");
              return data;
           }
   
           else throw new Error('failed')
           
   
   
    }
   );

   export const updateSuppThunk = createAsyncThunk(
    'updateSuppThunk',
    async ({ supplier, licensedNum }) => {
      const response = await fetch(`https://localhost:7086/api/Supplier/updateSupplier/${licensedNum}`, {
        method: 'PUT',
        body: JSON.stringify(supplier),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error('failed');
    }
  );