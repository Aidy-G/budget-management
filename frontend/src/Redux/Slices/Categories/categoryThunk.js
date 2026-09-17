import {createAsyncThunk} from '@reduxjs/toolkit'



export const addCategoryThunk = createAsyncThunk(

    'addCategoryThunk',
   
      async(category) => {

      console.log(category);
        const response = await fetch(`https://localhost:7086/api/Category/create`,{
        
            
        method:'POST',
        body: JSON.stringify(category),
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
   );

  export const updateCategoryThunk = createAsyncThunk(
  'updateCategoryThunk',
  async ({ category, categoryId }) => {
    const payload = {
      ...category,
      categoryId,
      categoryName: category?.categoryName ?? category?.CategoryName ?? '',
    };

    const response = await fetch(`https://localhost:7086/api/Category/UpdateCategory/${categoryId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
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