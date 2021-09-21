import React from 'react';
import logo from './images/logo.png';

// components
import TotalOrders from './components/TotalOrders';
import TopCustomers from './components/TopCustomers';
import CustomerOverlap from './components/CustomerOverlap';
import MonthlyOrders from './components/MonthlyOrders';

function App() {
	return (
		<div className="m-8">
			<header className="flex flex-row m-4 mb-8 items-center justify-center">
				<img src={logo} alt="" className="logo mr-2" />
				<h1 className="text-3xl font-bold text-left text-blue-900">
					Dashboard
				</h1>
			</header>
			<main>
				<TotalOrders />
				<TopCustomers />
				<MonthlyOrders />
				<CustomerOverlap />
			</main>
		</div>
	);
}

export default App;
