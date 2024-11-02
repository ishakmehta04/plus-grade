import React, { useState } from 'react';
import styled from 'styled-components';

const TotalTax = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const TaxResult: React.FC<{income: number, tax: number}> = ({income, tax}) => {
  const netIncome = income - tax;
  return (
    <TotalTax>
      <p>Income: ${income}</p>
      <p>Marginal tax: ${tax}</p>
      <p>Net Pay: ${netIncome}</p>
    </TotalTax>
  )

}