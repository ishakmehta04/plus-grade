export type CalucatedTaxPayload = {
	income: number;
	year: string;
};

export type TaxValue = number;

export interface CalculateStateType {
	data: number | null;
	isLoading: boolean;
	errors: string;
}

interface TaxBracket {
	max?: number;
	min: number;
	rate: number;
}

export interface TaxApiResponseType {
	tax_brackets: TaxBracket[];
}

export const TAX_SLICE = 'taxSlice';
export type TAX_SLICE = typeof TAX_SLICE;

export const GET_MARGINAL_TAX_BY_YEAR = `${TAX_SLICE}/getCalculateTaxAction`;
export type GET_MARGINAL_TAX_BY_YEAR = typeof GET_MARGINAL_TAX_BY_YEAR;
