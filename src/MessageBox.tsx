import React from 'react';
interface BoxProps {
	title: string;
	body: string;
	name?: string;
	username?: string;
}
const MessageBox = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
	const { title, body, name, username, ...rest } = props;
	return (
		<div ref={ref} {...rest} className='message-box'>
			<div className='user-details'>
				<p>{name}</p>

				<p className='uname'>@{username}</p>
			</div>

			<h4>{title}</h4>
			<p className='desc'>{body}</p>
		</div>
	);
});

export default MessageBox;
