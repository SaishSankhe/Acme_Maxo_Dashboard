import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TotalOrders() {
	const [topCustomers, setTopCustomers] = useState([]);

	useEffect(() => {
		getTopCustomers();
	}, []);

	// get top 10 customers by order volume
	async function getTopCustomers() {
		const { data } = await axios.get('/get/top-10-customers');
		setTopCustomers(data);
	}

	return (
		<div className="flex flex-col py-6">
			<div className="border-l-8 pl-4 border-blue-600 mb-4">
				<h2 className="text-2xl font-bold text-blue-900">Top customers</h2>
				<p className="text-sm py-1 text-blue-600">
					Top 10 customers based on their order volume (Acme and Maxo combined)
				</p>
			</div>
			<div className="flex flex-row text-center flex-wrap gap-x-12 gap-y-8 mt-8">
				{topCustomers.map((customer, index) => (
					<div
						key={index}
						className="flex flex-col px-7 py-8 bg-blue-100 bg-opacity-20 relative rounded-md flex-grow transition-all hover:shadow-md duration-250"
					>
						<span className="text-xs text-left bg-yellow-300 text-blue-900 font-semibold p-1 px-2 rounded-full absolute -top-2 -left-3">
							{index + 1}
						</span>
						<p className="text-4xl font-extrabold text-blue-900 pb-2">
							{customer?.total_orders}
							<span className="text-xs font-medium text-blue-600"> orders</span>
						</p>
						<p className="text-lg font-bold text-blue-900">{customer?.name}</p>
						<p className="text-blue-600 text-sm">
							{customer?.city}, {customer?.country}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default TotalOrders;
