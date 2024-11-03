import calculateReducer from './slice';
import { CalculateStateType } from './types';

export type StateType = {
  incomeTax: CalculateStateType;
};

export const rootReducers = {
	incomeTax: calculateReducer,
};
