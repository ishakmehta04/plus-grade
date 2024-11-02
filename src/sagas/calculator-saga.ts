import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { put, takeLatest, call } from "redux-saga/effects";
import { TaxApiResponseType, GET_MARGINAL_TAX_BY_YEAR, CalucatedTaxPayload } from "../redux/types";
import {  getCalculateTaxSuccessAction,getCalculateTaxErrorAction } from "../redux/slice";
import axios from 'axios';

function calculateTax(income: number, taxData: TaxApiResponseType): number {
  let totalTax = 0;

  for (const bracket of taxData.tax_brackets) {
    // Determine the maximum income for this bracket (or use income if in the top bracket)
    const upperLimit = bracket.max ? bracket.max : income;

    // Check if income is within this bracket
    if (income > bracket.min) {
      // Calculate the taxable amount for this bracket
      const taxableIncomeInBracket = Math.min(income, upperLimit) - bracket.min;

      // Calculate the tax for this bracket and add to the total
      totalTax += taxableIncomeInBracket * bracket.rate;
    }
  }

  return parseFloat(totalTax.toFixed(2));
}

// Generator function
export function* calculateSaga({ payload: {income, year} }: PayloadAction<CalucatedTaxPayload>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<TaxApiResponseType> = yield axios.get(`http://localhost:5001/tax-calculator/tax-year/${year}`);
    const {status, data} = response
    
    if(status === 200 && data) {
      const totalTax: number = yield call(calculateTax, income, data)
      console.log('FETCHED DATA', income, totalTax, response)

      yield put(getCalculateTaxSuccessAction(totalTax));
    }
    
  } catch (error) {
    const err = error as Error;
    const {message} = err;
    /**
     * Call any error monitoring tool like Datadog and pass the actual error(message from above line)
     */
    yield put(getCalculateTaxErrorAction("Something went wrong, please try again."));
  }
}

// Generator function
export function* watchCalculateIncomeTax() {
  yield takeLatest(GET_MARGINAL_TAX_BY_YEAR, calculateSaga);
}