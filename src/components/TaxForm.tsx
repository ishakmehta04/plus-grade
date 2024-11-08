// src/TaxForm.tsx
import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { getCalculateTaxAction } from '../redux/slice';
import { StateType } from '../redux/index';
import { TaxResult } from './TaxResult';
import { Spinner } from './Spinner';

const FormContainer = styled.div`
	max-width: 500px;
	margin: 20px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;

	@media (max-width: 600px) {
		margin: 20px 10px;
  	}
`;

const FormTitle = styled.h2`
	text-align: center;
`;

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	position: relative;
	align-items: flex-end;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
  	}
`;

const InputGroup = styled.div`
	text-align: left;
	@media (max-width: 600px) {
		width: 100%;
  	}
`;

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
`;

const commonStyles = css`
	box-sizing: border-box;
	border-radius: 74px;
	height: 48px;
	margin-right: 15px;
	background-color: #f6f6f9;
	border: #f6f6f9;
	width: 100%;
	padding: 0 15px;
`;

const Input = styled.input`
	${commonStyles};
`;

const Select = styled.select`
	${commonStyles};
	border-right: 16px solid transparent;
`;

const CalculateButton = styled.button`
	background-color: #e34b31;
	color: white;
	border: none;
	cursor: pointer;
	outline: none;
	border-radius: 50px;
	font-size: 14px;
	height: 48px;
	padding: 0px 18px;
	text-align: center;
	user-select: none;
	margin: 0;

	&:hover {
		background-color: #e42504;
	}

	&:disabled {
		cursor: not-allowed;
		background-color: #aab3bd;
	}

	@media (max-width: 600px) {
		margin: auto;
		width: 65%;
  	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 16px;
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
	const [resultVisibility, setResultVisibility] = useState<boolean>(false);

	// console.log('TaxForm UI', data, isLoading, serverError);

	// Effect to reset result whenever inputValue changes
	useLayoutEffect(() => {
		setResultVisibility(false);
	}, [annualIncome]);

	const isValid = useCallback(() => {
		const regex = /^\d*\.?\d*$/;

		// Validation
		if (!regex.test(annualIncome)) {
			setValidationError('Annual income must be a positive number.');
			return false;
		}
		if (!taxYear) {
			setValidationError('Please select a tax year.');
			return false;
		}

		return true;
	}, [annualIncome, taxYear]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isValid()) return;

		dispatch(
			getCalculateTaxAction({
				income: parseFloat(annualIncome),
				year: taxYear,
			}),
		);

		setResultVisibility(true);

		// Reset error if validation passes
		setValidationError('');
	};

	return (
		<>
			<FormContainer>
				<FormTitle>Tax Information</FormTitle>
				<Form onSubmit={handleSubmit}>
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
					<CalculateButton
						id="calculateButton"
						type="submit"
						disabled={isLoading}
					>
						Calculate
					</CalculateButton>
				</Form>
				{validationError && (
					<ErrorMessage>{validationError}</ErrorMessage>
				)}
				{serverError && <ErrorMessage>{serverError}</ErrorMessage>}
			</FormContainer>
			{isLoading && <Spinner />}
			{!isLoading && !serverError && resultVisibility && data !== null ? (
				<TaxResult income={parseFloat(annualIncome)} tax={data} />
			) : null}
		</>
	);
};
