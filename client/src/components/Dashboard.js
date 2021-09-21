import React from 'react';
import TotalOrders from './TotalOrders';
import TopCustomers from './TopCustomers';
import CustomerOverlap from './CustomerOverlap';
import MonthlyOrders from './MonthlyOrders';

function Dashboard() {
	return (
		<div>
			<TotalOrders />
			<TopCustomers />
			<MonthlyOrders />
			<CustomerOverlap />
		</div>
	);
}

export default Dashboard;
