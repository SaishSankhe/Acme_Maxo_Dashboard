const express = require('express');
const router = express.Router();
const pool = require('../db');
const customers = require('../data/json/customers.json');
const orders = require('../data/json/orders.json');
const acmeOrders = require('../data/json/acmeOrders.json');
const maxoOrders = require('../data/json/maxoOrders.json');

router.get('/customers', async (req, res) => {
	try {
		const customerColumnNames = Object.keys(customers[0]).map((item) =>
			item.toLowerCase()
		);

		let query = 'INSERT INTO customers (';

		for (const column of customerColumnNames) {
			query += column;

			if (column !== customerColumnNames[customerColumnNames.length - 1])
				query += ',';
		}

		query += ') VALUES(';

		for (let i = 1; i <= customerColumnNames.length; i++) {
			query += '$' + i;

			if (i !== customerColumnNames.length) query += ',';
		}

		query += ')';

		for (const customer of customers) {
			await pool.query(query, [
				customer.CUSTOMER_ID,
				customer.NAME,
				customer.GENDER,
				customer.STREET_ADDRESS,
				customer.CITY,
				customer.POSTAL_CODE,
				customer.COUNTRY,
			]);
		}

		res.status(200).json('Customers added to the database.');
	} catch (err) {
		console.log(err.message);
		res.status(500).json('There was some error while inserting into database.');
	}
});

router.get('/orders', async (req, res) => {
	try {
		const orderColumnNames = Object.keys(orders[0]).map((item) =>
			item.toLowerCase()
		);

		let query = 'INSERT INTO orders (';

		for (const order of orderColumnNames) {
			query += order;

			if (order !== orderColumnNames[orderColumnNames.length - 1]) query += ',';
		}

		query += ') VALUES(';

		for (let i = 1; i <= orderColumnNames.length; i++) {
			query += '$' + i;

			if (i !== orderColumnNames.length) query += ',';
		}

		query += ')';

		for (const order of orders) {
			await pool.query(query, [
				order.ORDER_ID,
				order.CUSTOMER_ID,
				order.ORDER_DATE,
				order.SHIPPING_DATE,
				order.PRODUCT_ID,
			]);
		}

		res.status(200).json('Orders added to the database.');
	} catch (err) {
		console.log(err.message);
		res.status(500).json('There was some error while inserting into database.');
	}
});

router.get('/acme', async (req, res) => {
	try {
		const acmeColumnNames = Object.keys(acmeOrders[0]).map((item) =>
			item.toLowerCase()
		);

		let query = 'INSERT INTO acme (';

		for (const column of acmeColumnNames) {
			query += column;

			if (column !== acmeColumnNames[acmeColumnNames.length - 1]) query += ',';
		}

		query += ') VALUES(';

		for (let i = 1; i <= acmeColumnNames.length; i++) {
			query += '$' + i;

			if (i !== acmeColumnNames.length) query += ',';
		}

		query += ')';

		for (const order of acmeOrders) {
			await pool.query(query, [
				order.ORDER_ID,
				order.CUSTOMER_ID,
				order.PRODUCT_ID,
			]);
		}

		res.status(200).json('Acme orders added to the database.');
	} catch (err) {
		console.log(err.message);
		res.status(500).json('There was some error while inserting into database.');
	}
});

router.get('/maxo', async (req, res) => {
	try {
		const maxoColumnNames = Object.keys(maxoOrders[0]).map((item) =>
			item.toLowerCase()
		);

		let query = 'INSERT INTO maxo (';

		for (const column of maxoColumnNames) {
			query += column;

			if (column !== maxoColumnNames[maxoColumnNames.length - 1]) query += ',';
		}

		query += ') VALUES(';

		for (let i = 1; i <= maxoColumnNames.length; i++) {
			query += '$' + i;

			if (i !== maxoColumnNames.length) query += ',';
		}

		query += ')';

		for (const order of maxoOrders) {
			await pool.query(query, [
				order.ORDER_ID,
				order.CUSTOMER_ID,
				order.PRODUCT_ID,
			]);
		}

		res.status(200).json('Maxo orders added to the database.');
	} catch (err) {
		console.log(err.message);
		res.status(500).json('There was some error while inserting into database.');
	}
});

module.exports = router;
