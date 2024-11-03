import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { TaxForm } from './TaxForm';
import { getCalculateTaxAction } from '../redux/slice';
import { formInputs } from '../e2e/mock';

// Create a mock store
const mockStore = configureStore([]);

const setup = (initialState = {}) => {
  const store = mockStore({
    incomeTax: {
      data: null,
      isLoading: false,
      errors: null,
      ...initialState
    },
    ...initialState
  });

  const utils = render(
    <Provider store={store}>
      <TaxForm />
    </Provider>
  );
  return { store, ...utils };
};

describe('TaxForm Component', () => {
  it('should dispatch action on valid form submission', async () => {
    const initialState = {
      incomeTax: {
        data: null,
        isLoading: false,
        errors: null,
      },
    };

    const { getByLabelText, getByText, store } = setup(initialState);

    fireEvent.change(getByLabelText(/annual income/i), { target: { value: formInputs.income } });
    fireEvent.change(getByLabelText(/tax year/i), { target: { value: formInputs.year } });

    fireEvent.click(getByText(/calculate/i));

    const actions = store.getActions();
    expect(actions).toEqual([
      getCalculateTaxAction({ income: 100000, year: '2022' }),
    ]);
  });

  it('should show validation error for invalid annual income', async () => {
    const { getByLabelText, getByText } = setup();

    fireEvent.change(getByLabelText(/annual income/i), { target: { value: 'invalid' } });
    fireEvent.change(getByLabelText(/tax year/i), { target: { value: formInputs.year } });

    fireEvent.click(getByText(/calculate/i));

    expect(await getByText(/annual income must be a positive number/i)).toBeInTheDocument();
  });

  it('should show validation error when tax year is not selected', async () => {
    const { getByLabelText, getByText } = setup();

    fireEvent.change(getByLabelText(/annual income/i), { target: { value: formInputs.income } });
    fireEvent.change(getByLabelText(/tax year/i), { target: { value: '' } });

    fireEvent.click(getByText(/calculate/i));

    expect(await getByText(/please select a tax year/i)).toBeInTheDocument();
  });

  it('should show spinner when loading', () => {
    const initialState = {
      incomeTax: {
        data: null,
        isLoading: true,
        errors: null,
      },
    };

    const { getByRole } = setup(initialState);

    expect(getByRole('status')).toBeInTheDocument();
  });

  it('should show server error message if present', async () => {
    const initialState = {
      incomeTax: {
        data: null,
        isLoading: false,
        errors: 'Something went wrong. Please try again.',
      },
    };

    const { getByText } = setup(initialState);

    expect(getByText(/something went wrong. please try again./i)).toBeInTheDocument();
  });
});
