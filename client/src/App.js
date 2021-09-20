import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [getMessage, setMessage] = useState('');

	useEffect(() => {
		(async function getData() {
			const { data } = await axios.get('/hello');
			setMessage(data.response);
			console.log(data.response);
		})();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>{getMessage}</p>
			</header>
		</div>
	);
}

export default App;
