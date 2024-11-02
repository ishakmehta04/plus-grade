import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAX_SLICE, CalucatedTaxPayload, CalculateStateType } from "./types";

const incomeTaxInitialState: CalculateStateType = {
  data: null,
  isLoading: false,
  errors: ''
}

export const calculteTaxSlice = createSlice({
  name: TAX_SLICE,
  initialState: incomeTaxInitialState,
  reducers: {
    /* This action will trigger our saga middleware
       and set the loader to true and reset error message.
    */
    getCalculateTaxAction: (state: CalculateStateType, { payload: {income, year} }: PayloadAction<CalucatedTaxPayload>) => {
      state.isLoading = true;
      state.errors = '';
    },
    getCalculateTaxSuccessAction: (state: CalculateStateType, { payload: totalTaxes }: PayloadAction<number>) => {
      state.isLoading = false;
      state.data = totalTaxes;
    },
    getCalculateTaxErrorAction: (state: CalculateStateType, { payload: error }: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = error;
    },
  }
})

export const {
  getCalculateTaxAction,
  getCalculateTaxSuccessAction,
  getCalculateTaxErrorAction
} = calculteTaxSlice.actions;
export default calculteTaxSlice.reducer;