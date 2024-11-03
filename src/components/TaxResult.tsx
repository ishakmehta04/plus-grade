import React, { useState } from 'react';
import styled from 'styled-components';
import { PieChart } from 'react-minimal-pie-chart';

const TotalTax = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  gap: 50px;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
`;

export const TaxResult: React.FC<{income: number, tax: number}> = ({income, tax}) => {
  const netIncome = income - tax;
  const pieIncomeData = [
    { title: 'Net Pay', value: netIncome, color: '#691f74' },
    { title: 'Marginal Tax', value: tax, color: '#D6432A' },
  ]
  return (
    <TotalTax>
      <div>
      <p>Income: ${income}</p>
      <p>Marginal tax: ${tax}</p>
      <p>Net Pay: ${netIncome}</p>
      </div>

      <PieChart 
        data={pieIncomeData}
        style={{width: '300px', height: '150px' }} 
        label={({dataEntry})=> `${dataEntry.title}: ${Math.round(dataEntry.percentage)}%`}
        labelPosition={112}
        labelStyle={{
          fontSize: '5px',
          fill: '#000',
        }}
      />
    </TotalTax>
  )
}