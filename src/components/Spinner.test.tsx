// Spinner.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
	it('renders the spinner', () => {
		const { getByRole } = render(<Spinner />);
		const spinner = getByRole('status');

		expect(spinner).toBeInTheDocument();
	});

	it('has correct animation properties using regex', () => {
		const { getByRole } = render(<Spinner />);
		const spinner = getByRole('status');

		const animation = window.getComputedStyle(spinner).animation;
		const animationRegex = /^[a-zA-Z0-9]+ 1s linear infinite$/;

		expect(animation).toMatch(animationRegex);
	});
});
