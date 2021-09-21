import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TotalOrders() {
	const [acmeTotalOrders, setAcmeTotalOrders] = useState([]);
	const [maxoTotalOrders, setMaxoTotalOrders] = useState([]);

	useEffect(() => {
		getAcmeTotalOrders();
		getMaxoTotalOrders();
	}, []);

	async function getAcmeTotalOrders() {
		const { data } = await axios.get('/get/all-acme-orders');
		setAcmeTotalOrders(data);
	}

	async function getMaxoTotalOrders() {
		const { data } = await axios.get('/get/all-maxo-orders');
		setMaxoTotalOrders(data);
	}

	return (
		<div className="flex flex-col py-4">
			<h2 className="text-xl font-bold">Total orders fulfilled (2017)</h2>
			<div className="flex flex-row text-center">
				<div className="flex flex-col px-4 py-8 bg-gray-100 rounded-md mr-8 my-4 flex-grow">
					<p className="text-5xl font-extrabold text-gray-700">
						{acmeTotalOrders.length}
					</p>
					<p className="text-lg text-center font-normal font-medium text-gray-600">
						Acme
					</p>
				</div>
				<div className="flex flex-col px-4 py-8 bg-gray-100 rounded-md ml-6 my-4 flex-grow">
					<p className="text-5xl font-extrabold text-gray-700">
						{maxoTotalOrders.length}
					</p>
					<p className="text-lg text-center font-medium text-gray-600">Maxo</p>
				</div>
			</div>
		</div>
	);
}

export default TotalOrders;
