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
		<div className="flex flex-col py-6">
			<div className="border-l-8 pl-4 border-blue-600 mb-4">
				<h2 className="text-2xl font-bold text-blue-900">
					Total orders fulfilled (2017)
				</h2>
				<p className="text-sm py-1 text-blue-600">
					All orders that are shipped before Dec 31st, 2017
				</p>
			</div>
			<div className="flex flex-row text-center">
				<div className="flex flex-col px-4 py-8 bg-blue-100 bg-opacity-20 rounded-md mr-8 my-4 flex-grow">
					<p className="text-5xl font-extrabold text-blue-900">
						{acmeTotalOrders.length}
					</p>
					<p className="text-lg text-center font-normal text-blue-600">Acme</p>
				</div>
				<div className="flex flex-col px-4 py-8 bg-blue-100 bg-opacity-20 rounded-md ml-6 my-4 flex-grow">
					<p className="text-5xl font-extrabold text-blue-900">
						{maxoTotalOrders.length}
					</p>
					<p className="text-lg text-center font-normal text-blue-600">Maxo</p>
				</div>
			</div>
		</div>
	);
}

export default TotalOrders;
