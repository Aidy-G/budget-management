

import { createAsyncThunk } from '@reduxjs/toolkit';

export const updatePaymentsThunk = createAsyncThunk(
  'payments/updatePayments',
  
  async (paymentData, { rejectWithValue }) => {
    try {
      console.log('Sending payment data:', paymentData);

      const response = await fetch('https://localhost:7086/api/Expenditures/updateAmountPaid'
      , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating payments:', error);
      return rejectWithValue(error.message);
    }
  }
);



