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
		getMonthkyCustomers();
	}, []);

	async function getMonthkyCustomers() {
		let monthlyOrders = [];

		for (let i = 1; i <= 12; i++) {
			const { data: acme } = await axios.get(`/get/acme/${i}`);
			const { data: maxo } = await axios.get(`/get/maxo/${i}`);

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
		<div className="flex flex-col py-4">
			<h2 className="text-xl font-bold">Monthly orders</h2>
			<ResponsiveContainer width="95%" height={300} className="my-8">
				<LineChart height={250} data={monthlyCustomers}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="acme" stroke="#8884d8" />
					<Line type="monotone" dataKey="maxo" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default MonthlyOrders;
