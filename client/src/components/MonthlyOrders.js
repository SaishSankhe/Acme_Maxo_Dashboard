import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

function MonthlyOrders() {
	const [monthlyCustomers, setMonthlyCustomers] = useState([]);
	// using object as a enumerator
	const months = {
		1: 'Jan',
		2: 'Feb',
		3: 'Mar',
		4: 'Apr',
		5: 'May',
		6: 'Jun',
		7: 'Jul',
		8: 'Aug',
		9: 'Sep',
		10: 'Oct',
		11: 'Nov',
		12: 'Dec',
	};

	useEffect(() => {
		getMonthlyCustomers();
	}, []);

	async function getMonthlyCustomers() {
		let monthlyOrders = [];

		for (let i = 1; i <= 12; i++) {
			let monthNumber = '';

			// construct month string in "MM" format
			if (i < 10) monthNumber = '0' + i;
			else monthNumber = i.toString();

			const { data: acme } = await axios.get(`/get/acme/${monthNumber}`);
			const { data: maxo } = await axios.get(`/get/maxo/${monthNumber}`);

			// construct object to pass to recharts.js
			const month = {
				month: months[i],
				acme: acme.length,
				maxo: maxo.length,
			};

			monthlyOrders.push(month);
		}

		setMonthlyCustomers(monthlyOrders);
	}

	return (
		<div className="flex flex-col py-8">
			<div className="border-l-8 pl-4 border-blue-600 mb-4">
				<h2 className="text-2xl font-bold text-blue-900">Monthly orders</h2>
				<p className="text-sm py-1 text-blue-600">
					All orders for Acme and Maxo in the year 2017 divided by months
				</p>
			</div>
			<ResponsiveContainer width="95%" height={300} className="my-8">
				<LineChart height={250} data={monthlyCustomers}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="acme" stroke="#DC2626" />
					<Line type="monotone" dataKey="maxo" stroke="#065F46" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default MonthlyOrders;
