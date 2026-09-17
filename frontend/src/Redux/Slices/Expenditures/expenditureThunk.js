import {createAsyncThunk} from '@reduxjs/toolkit'

export const addExpThunk = createAsyncThunk(

    'addExpThunk',
   
      async(exp) => {

    
        const response = await fetch("https://localhost:7086/api/Expenditures/create"
        ,{
            
        method:'POST',
        body: JSON.stringify(exp),
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


   
export const updateExpenditureThunk = createAsyncThunk(
  'updateExpenditureThunk',

  async ({ expenditure, isAccepted }, { rejectWithValue }) => {
    try {

      // יוצרים עותק של ההוצאה עם סטטוס האישור החדש
      const updatedExpenditure = {
        ...expenditure,
        IsAccepted: isAccepted,
      };
          
console.log("הגיע לתנק עדכון הוצאה",updatedExpenditure);
      // הנתיב בשרת מוגדר כ-[HttpPut("updateExp/{id}")], לכן ההוצאה מזוהה לפי ה-id שבסוף הכתובת.
      const response = await fetch(

        // https://localhost:7086/api/Expenditures/updateExpenditure/19
        `https://localhost:7086/api/Expenditures/updateExpenditure/${expenditure.id}`,
        {
          method: 'PUT',
          

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(updatedExpenditure),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        return rejectWithValue(
          errorText || 'שגיאה בעדכון ההוצא ב rejectה'
        );
      }

      // אצלך בשרת updateExp מוגדר כ-void,
      // ולכן אין בהכרח JSON שחוזר מהשרת.
      return {
        ...updatedExpenditure,
      };

    } catch (error) {

      console.error(
        'Error updating expenditure approval:',
        error
      );

      return rejectWithValue(
        error.message || 'שגיאה בחיבור לשרת'
      );
    }
  }
);
