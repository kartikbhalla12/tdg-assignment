import React from 'react';
import './style.css';

function Navbar() {
	const [active, setActive] = React.useState(false);

	React.useEffect(() => {
		const scrollHandler = () => {
			if (window.scrollY > 40 && !active) setActive(true);
			else if (window.scrollY <= 40 && active) setActive(false);
		};

		window.addEventListener('scroll', scrollHandler);

		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	});

	return (
		<div className={`navbar ${active ? 'dark-bg' : ''}`}>
			<div className='inner-container'>
				<div className='img-container'>
					<img src='/jitter.svg'></img>
				</div>
				<div className={`name ${active ? 'scrolled' : ''} `}>Jitter</div>
				<div className='sign-in-menu'>
					<div className='sign-up'>
						<a href='https://www.kartikbhalla.dev'>Back to Portfolio?</a>
					</div>
					<div className='sign-in'>Login</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
