import React from 'react';
import MessageBox from './MessageBox';
import usePostSearch from './usePostSearch';
import { css } from '@emotion/react';
import BarLoader from 'react-spinners/BarLoader';
import './App.css';

function App() {
	const [page, setPage] = React.useState(1);
	const [limit, setLimit] = React.useState(10);

	const { posts, loading, hasMore, error } = usePostSearch(page, limit);

	let observer: IntersectionObserver;

	const lastElementRef = React.useCallback(
		element => {
			if (loading) return;
			if (observer) observer.disconnect();

			observer = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) setPage(page + 1);
			});

			if (element) observer.observe(element);
		},
		[loading, hasMore]
	);

	const override = css`
		display: block;
		margin: 2rem auto;
		border-radius: 100px;
	`;

	if (posts.length === 0 && loading)
		return (
			<div className='container'>
				<BarLoader
					loading={true}
					css={override}
					color={'#fff'}
					height={5}
					width={200}
				/>
			</div>
		);

	return (
		<div className='container'>
			{posts.map((post, index) => {
				if (index === posts.length - 1)
					return (
						<MessageBox
							key={post.id}
							ref={lastElementRef}
							title={post.title}
							body={post.body}
							name={post.name}
							username={post.username}
						/>
					);

				return (
					<MessageBox
						key={post.id}
						title={post.title}
						body={post.body}
						name={post.name}
						username={post.username}
					/>
				);
			})}
			<div style={{ minHeight: '4rem' }}>
				<BarLoader
					loading={loading}
					css={override}
					color={'#fff'}
					height={5}
					width={200}
				/>
			</div>
		</div>
	);
}

export default App;
