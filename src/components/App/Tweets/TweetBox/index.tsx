import React from 'react';
import './style.css';

interface BoxProps {
	title: string;
	body: string;
	name?: string;
	username?: string;
}

const TweetBox = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
	const { title, body, name, username, ...rest } = props;
	return (
		<div ref={ref} {...rest} className='tweet-box'>
			<div className='user-details'>
				<p>{name}</p>

				<p className='uname'>@{username}</p>
			</div>

			<h4>{title}</h4>
			<p className='desc'>{body}</p>
		</div>
	);
});

export default TweetBox;
