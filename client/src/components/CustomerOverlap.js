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
		<div className="flex flex-col py-4">
			<h2 className="text-xl font-bold">Customer overlap</h2>
			<div className="flex flex-row text-center flex-wrap">
				{overlap.map((customer, index) => (
					<div
						key={index}
						className="flex flex-col px-4 py-8 bg-gray-100 rounded-md mr-8 my-4 flex-grow transition-all hover:shadow-lg duration-250"
					>
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

export default CustomerOverlap;
