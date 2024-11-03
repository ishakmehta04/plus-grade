// src/TaxForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCalculateTaxAction } from '../redux/slice';
import { StateType } from '../redux/index';
import { TaxResult } from './TaxResult';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #aab3bd;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

export const TaxForm: React.FC = () => {
	const dispatch = useDispatch();
	const {
		data,
		isLoading,
		errors: serverError,
	} = useSelector((state: StateType) => state.incomeTax);
	const [annualIncome, setAnnualIncome] = useState<string>('');
	const [taxYear, setTaxYear] = useState<string>('');
	const [validationError, setValidationError] = useState<string>('');

	console.log('TaxForm UI', data, isLoading, serverError);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const regex = /^(0|[1-9][0-9]*)(\.[0-9]+)?$/;

		// Validation
		if (!regex.test(annualIncome)) {
			setValidationError('Annual income must be a positive number.');
			return;
		}
		if (!taxYear) {
			setValidationError('Please select a tax year.');
			return;
		}

		dispatch(
			getCalculateTaxAction({
				income: parseFloat(annualIncome),
				year: taxYear,
			}),
		);

		// Reset error if validation passes
		setValidationError('');

		console.log('Annual Income:', annualIncome);
		console.log('Tax Year:', taxYear);
		// Logic to handle form submission can be added here
	};

	return (
		<>
			<FormContainer>
				<FormTitle>Tax Information</FormTitle>
				<form onSubmit={handleSubmit}>
					<InputGroup>
						<Label htmlFor="annualIncome">Annual Income:</Label>
						<Input
							type="text"
							id="annualIncome"
							value={annualIncome}
							onChange={(e) => setAnnualIncome(e.target.value)}
							required
						/>
					</InputGroup>
					<InputGroup>
						<Label htmlFor="taxYear">Tax Year:</Label>
						<Select
							id="taxYear"
							value={taxYear}
							onChange={(e) => setTaxYear(e.target.value)}
							required
						>
							<option value="">Select a tax year</option>
							<option value="2019">2019</option>
							<option value="2020">2020</option>
							<option value="2021">2021</option>
							<option value="2022">2022</option>
						</Select>
					</InputGroup>
					{validationError && <ErrorMessage>{validationError}</ErrorMessage>}

					{serverError && <ErrorMessage>{serverError}</ErrorMessage>}
					<SubmitButton type="submit" disabled={isLoading}>
            Submit
					</SubmitButton>
				</form>
			</FormContainer>
			{!isLoading && !serverError && data && (
				<TaxResult income={parseFloat(annualIncome)} tax={data} />
			)}
		</>
	);
};
