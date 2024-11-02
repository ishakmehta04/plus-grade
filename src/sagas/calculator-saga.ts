import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { put, takeLatest, } from "redux-saga/effects";
import { TaxApiResponseType, GET_MARGINAL_TAX_BY_YEAR, CalucatedTaxPayload } from "../redux/types";
import {  getCalculateTaxSuccessAction,getCalculateTaxErrorAction } from "../redux/slice";
import axios from 'axios';

// Generator function
export function* calculateSaga({ payload: {income, year} }: PayloadAction<CalucatedTaxPayload>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<TaxApiResponseType> = yield axios.get(`http://localhost:5001/tax-calculator/tax-year/${year}`);
    const {status, data} = response
    
    if(status === 200 && data) {
      const {tax_brackets} = data
      console.log('FETCHED DATA', income, tax_brackets)

      yield put(getCalculateTaxSuccessAction(1));
    }
    
  } catch (error) {
    const err = error as Error;
    yield put(getCalculateTaxErrorAction(err.message));
  }
}

// Generator function
export function* watchcalculateIncomeTax() {
  yield takeLatest(GET_MARGINAL_TAX_BY_YEAR, calculateSaga);
}