const { query } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../db');

/*
 * get total number of orders in 2017
 * returns integer
 */
router.get('/total-orders', async (req, res) => {
	try {
		const orders = await pool.query(
			"SELECT * FROM orders WHERE shipping_date <= '2017-12-31'"
		);

		res.status(200).json({ totalOrders: orders.rowCount });
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

/*
 * get all orders' data
 * returns an array
 */
router.get('/all-orders', async (req, res) => {
	try {
		const orders = await pool.query('SELECT * FROM orders');

		res.status(200).json(orders.rows);
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

/*
 * get top 10 customers by order volume
 * returns an array of 10 objects
 */

router.get('/top-10-customers', async (req, res) => {
	try {
		let topCustomers = await pool.query(
			'SELECT customer_id, count(customer_id)\
			FROM orders\
			GROUP BY customer_id\
			ORDER BY count(customer_id) DESC\
			LIMIT 10'
		);

		topCustomers = topCustomers.rows; // returns 10 customer_ids

		let topCustomersData = [];

		// for all the customer_ids got from the above query
		// get respective customer data from customers table
		for (const customer of topCustomers) {
			const customerData = await pool.query(
				'SELECT * FROM customers WHERE customer_id=$1',
				[customer.customer_id]
			);

			const updateCustomer = {
				customer_id: customerData.rows[0].customer_id,
				name: customerData.rows[0].name,
				gender: customerData.rows[0].gender,
				street_address: customerData.rows[0].street_address,
				city: customerData.rows[0].city,
				country: customerData.rows[0].country,
				total_orders: customer.count,
			};

			topCustomersData.push(updateCustomer);
		}

		res.status(200).json(topCustomersData);
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

/*
 * get all acme orders' data
 * returns an array
 */
router.get('/all-acme-orders', async (req, res) => {
	try {
		const acmeOrders = await pool.query('SELECT * FROM acme');

		res.status(200).json(acmeOrders.rows);
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

/*
 * get all maxo orders' data
 * returns an array
 */
router.get('/all-maxo-orders', async (req, res) => {
	try {
		const maxoOrders = await pool.query('SELECT * FROM maxo');

		res.status(200).json(maxoOrders.rows);
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

/*
 * get all maxo or acme orders' data
 * in a particular month
 * returns an array
 */
router.get('/:company/:month', async (req, res) => {
	// company should be either "maxo" or "acme"
	// month should be in format "MM"
	const { company } = req.params;
	const { month } = req.params;
	const monthRegex = /0[1-9]|1[0-2]/;

	// error handling for company
	if (company !== 'maxo' && company !== 'acme') {
		res.status(500).json('Wrong company parameter.');
		return;
	}

	// error handling for month
	if (!month.match(monthRegex) || month.length > 2) {
		res.status(500).json('Wrong month parameter.');
		return;
	}

	// construct date string
	const startDate = '2017-' + month + '-01';
	const endDate = (generateEndDate = () => {
		// generate end date based on which month is it
		if (
			month === 1 ||
			month === 3 ||
			month === 5 ||
			month === 7 ||
			month === 8 ||
			month === 10 ||
			month === 12
		)
			return '2017-' + month + '-31';
		else if (month === 4 || month === 6 || month === 9 || month === 11)
			return '2017-' + month + '-30';
		else return '2017-' + month + '-28'; // as 2017 was not leap year, directly set date as 28
	})();

	try {
		// if company parameter is "maxo"
		if (company === 'maxo') {
			const orders = await pool.query(
				'SELECT maxo.order_id, maxo.product_id, maxo.customer_id, order_date, shipping_date\
        FROM maxo\
        INNER JOIN orders USING (order_id)\
        WHERE order_date BETWEEN $1 AND $2\
        ORDER BY order_date',
				[startDate, endDate]
			);

			res.status(200).json(orders.rows);
		} else if (company === 'acme') {
			// if company parameter is "acme"
			const orders = await pool.query(
				'SELECT acme.order_id, acme.product_id, acme.customer_id, order_date, shipping_date\
        FROM acme\
        INNER JOIN orders USING (order_id)\
        WHERE order_date BETWEEN $1 AND $2\
        ORDER BY order_date',
				[startDate, endDate]
			);

			res.status(200).json(orders.rows);
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

/*
 * get all customers that ordered from maxo as well as acme
 * returns an array with customer information
 */
router.get('/overlap', async (req, res) => {
	try {
		let orders = await pool.query(
			'SELECT customer_id\
        FROM maxo\
        INNER JOIN acme USING (customer_id)\
        WHERE maxo.customer_id = acme.customer_id\
				GROUP BY customer_id'
		);

		orders = orders.rows;

		let topCustomersData = [];

		// for all customer_ids, get respective customer data
		for (const customer of orders) {
			const customerData = await pool.query(
				'SELECT * FROM customers WHERE customer_id=$1',
				[customer.customer_id]
			);

			const updateCustomer = {
				customer_id: customerData.rows[0].customer_id,
				name: customerData.rows[0].name,
				gender: customerData.rows[0].gender,
				street_address: customerData.rows[0].street_address,
				city: customerData.rows[0].city,
				country: customerData.rows[0].country,
			};

			topCustomersData.push(updateCustomer);
		}

		res.status(200).json(topCustomersData);
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

/*
 * get gender based data on customers
 * returns an object with male and female counts
 */
router.get('/gender', async (req, res) => {
	try {
		const maleCustomers = await pool.query(
			"SELECT count(customer_id)\
        FROM customers\
        WHERE gender = 'Male'"
		);

		const femaleCustomers = await pool.query(
			"SELECT count(customer_id)\
        FROM customers\
        WHERE gender = 'Female'"
		);

		const genderDistribution = {
			male: maleCustomers.rows[0].count,
			female: femaleCustomers.rows[0].count,
		};

		res.status(200).json(genderDistribution);
	} catch (error) {
		console.log(error.message);
		res.status(500).json('There was some issue with the database.');
	}
});

module.exports = router;
