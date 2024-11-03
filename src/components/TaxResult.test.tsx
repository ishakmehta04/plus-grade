import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaxResult } from './TaxResult';

describe('TaxResult Component', () => {
	const income = 100000;
	const tax = 25000;
	const netIncome = income - tax;

	it('should display income, marginal tax, and net pay correctly', () => {
		render(<TaxResult income={income} tax={tax} />);

		// Check if income, tax, and net pay are displayed correctly
		expect(screen.getByText(`Income: $${income}`)).toBeInTheDocument();
		expect(screen.getByText(`Marginal tax: $${tax}`)).toBeInTheDocument();
		expect(
			screen.getByText(`Net Pay: $${netIncome.toFixed(2)}`),
		).toBeInTheDocument();
	});

	it('should show correct percentage labels in PieChart', () => {
		render(<TaxResult income={income} tax={tax} />);

		// Check PieChart labels
		expect(screen.getByText(/Net Pay: 75%/)).toBeInTheDocument();
		expect(screen.getByText(/Marginal Tax: 25%/)).toBeInTheDocument();
	});
});
