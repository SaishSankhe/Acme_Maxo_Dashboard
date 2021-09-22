import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerOverlap() {
	const [overlap, setOverlap] = useState([]);

	useEffect(() => {
		getOverlapCustomers();
	}, []);

	async function getOverlapCustomers() {
		const { data } = await axios.get('/get/overlap');
		setOverlap(data);
	}

	return (
		<div className="flex flex-col py-6">
			<div className="border-l-8 pl-4 border-blue-600 mb-4">
				<h2 className="text-2xl font-bold text-blue-900">Customer overlap</h2>
				<p className="text-sm py-1 text-blue-600">
					Customers that ordered from Acme as well as Maxo
				</p>
			</div>
			<div className="flex flex-row text-center flex-wrap gap-x-12 gap-y-8 mt-8">
				{overlap.map((customer, index) => (
					<div
						key={index}
						className="flex flex-col px-4 py-8 bg-blue-100 bg-opacity-20 rounded-md flex-grow transition-all hover:shadow-lg duration-250"
					>
						<p className="text-xl font-bold text-blue-900">{customer?.name}</p>
						<p className="text-blue-600">
							{customer?.city}, {customer?.country}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default CustomerOverlap;
