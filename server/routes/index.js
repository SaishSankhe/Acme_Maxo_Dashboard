const addToDb = require('./addToDb');
const getFromDb = require('./getFromDb');

const constructorMethod = (app) => {
	app.use('/insert', addToDb);
	app.use('/get', getFromDb);

	app.use('*', (req, res) => {
		res.json({ error: 404 });
	});
};

module.exports = constructorMethod;
