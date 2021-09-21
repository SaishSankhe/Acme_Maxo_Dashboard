import React from 'react';

// components
import Dashboard from './components/Dashboard';

function App() {
	return (
		<div className="m-8">
			<header>
				<h1 className="m-4 text-4xl font-bold text-center">Dashboard</h1>
			</header>
			<main>
				<Dashboard />
			</main>
		</div>
	);
}

export default App;
