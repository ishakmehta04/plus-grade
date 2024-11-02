import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TaxForm} from './TaxForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
      Marginal Tax Calculator
      </header>
      <TaxForm />
    </div>
  );
}

export default App;
