import React from 'react';
import TweetBox from './TweetBox';
import usePostSearch from '../../../hooks/usePostSearch';
import Loader from '../common/Loader';
import './style.css';

function Tweets() {
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

	if (posts.length === 0 && loading)
		return (
			<div className='tweets'>
				<Loader loading={true} />
			</div>
		);

	return (
		<div className='tweets'>
			{posts.map((post, index) => {
				if (index === posts.length - 1)
					return (
						<TweetBox
							key={post.id}
							ref={lastElementRef}
							title={post.title}
							body={post.body}
							name={post.name}
							username={post.username}
						/>
					);

				return (
					<TweetBox
						key={post.id}
						title={post.title}
						body={post.body}
						name={post.name}
						username={post.username}
					/>
				);
			})}
			<div style={{ minHeight: '4rem' }}>
				<Loader loading={loading} />
			</div>
		</div>
	);
}

export default Tweets;
