import React from 'react';
import Navbar from './common/Navbar';
import Tweets from './Tweets';
import './style.css';

function App() {
	return (
		<>
			<Navbar />
			<div className='container'>
				<Tweets />
			</div>
		</>
	);
}

export default App;
