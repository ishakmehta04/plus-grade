import React from 'react';
import './App.css';
import { TaxForm } from './components/TaxForm';

const App: React.FC = () => {
	return (
		<div className="App">
			<header className="App-header">Marginal Tax Calculator</header>
			<TaxForm />
		</div>
	);
};

export default App;
