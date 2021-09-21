import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TotalOrders() {
	const [topCustomers, setTopCustomers] = useState([]);

	useEffect(() => {
		getTopCustomers();
	}, []);

	async function getTopCustomers() {
		const { data } = await axios.get('/get/top-10-customers');
		setTopCustomers(data);
	}

	return (
		<div className="flex flex-col py-4">
			<h2 className="text-xl font-bold">Top customers</h2>
			<div className="flex flex-row text-center flex-wrap">
				{topCustomers.map((customer, index) => (
					<div
						key={index}
						className="flex flex-col px-4 py-8 bg-gray-100 rounded-md mr-8 my-4 flex-grow transition-all hover:shadow-lg duration-250"
					>
						<p className="text-4xl font-extrabold text-gray-700 pb-2">
							{customer?.total_orders}
							<span className="text-xs font-medium"> orders</span>
						</p>
						<p className="text-xl font-bold text-gray-700">{customer?.name}</p>
						<p className="text-gray-700">
							{customer?.city}, {customer?.country}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default TotalOrders;
