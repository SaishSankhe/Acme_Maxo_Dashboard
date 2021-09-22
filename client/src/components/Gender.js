import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Pie,
	PieChart,
	Legend,
	Tooltip,
	Cell,
	ResponsiveContainer,
} from 'recharts';

function MonthlyOrders() {
	const [genderDistribution, setGenderDistribution] = useState([]);
	const COLORS = ['#0088FE', '#00C49F'];

	useEffect(() => {
		getGenderDistribution();
	}, []);

	async function getGenderDistribution() {
		const { data } = await axios.get('/get/gender');

		const gender = [
			{
				name: 'Male',
				value: parseInt(data.male),
			},
			{
				name: 'Female',
				value: parseInt(data.female),
			},
		];

		console.log(gender);

		setGenderDistribution(gender);
	}

	return (
		<div className="flex flex-col py-8">
			<div className="border-l-8 pl-4 border-blue-600 mb-4">
				<h2 className="text-2xl font-bold text-blue-900">
					Gender distribution of customers
				</h2>
				<p className="text-sm py-1 text-blue-600">
					Total number of males and females who ordered from Acme and Maxo
				</p>
			</div>
			<ResponsiveContainer width="95%" height={260} className="my-2">
				<PieChart>
					<Pie
						data={genderDistribution}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={100}
						fill="#8884d8"
						label
					>
						{genderDistribution.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend verticalAlign="top" height={36} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

export default MonthlyOrders;
