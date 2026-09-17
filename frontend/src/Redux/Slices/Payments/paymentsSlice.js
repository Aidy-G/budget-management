import { createSlice } from '@reduxjs/toolkit';
import { updatePaymentsThunk } from './updateThunk';

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  updatedCount: 0
};

export const paymentsSlice = createSlice({
  name: 'payments',

  initialState:INITIAL_STATE,

  reducers: {
    clearPaymentStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.updatedCount = 0;
    },
    resetPayments: (state) => {
        state.payments = [];
    }
  },
  extraReducers: (builder) => {
    
      builder.addCase(updatePaymentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePaymentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedCount = action.payload.updatedCount || 0;
        state.error = null;
      })
      .addCase(updatePaymentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { clearPaymentStatus, resetPayments } = paymentsSlice.actions;
export default paymentsSlice.reducer;


