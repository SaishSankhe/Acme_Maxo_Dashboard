const addToDb = require('./addToDb');
const getFromDb = require('./getFromDb');

const constructorMethod = (app) => {
	app.use('/insert', addToDb); // route for database insertion functions
	app.use('/get', getFromDb); // route for database retrieval functions

	app.use('*', (req, res) => {
		res.json({ error: 404 });
	});
};

module.exports = constructorMethod;
