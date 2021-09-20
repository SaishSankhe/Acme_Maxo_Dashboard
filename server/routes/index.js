const hello = require('./hello');

const constructorMethod = (app) => {
	app.use('/hello/', hello);

	app.use('*', (req, res) => {
		res.json({ error: 404 });
	});
};

module.exports = constructorMethod;
