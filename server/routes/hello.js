const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const message = { response: 'hello, server is working' };
	res.send(message);
});

module.exports = router;
