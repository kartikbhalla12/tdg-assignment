import React from 'react';
import usePostSearch from './usePostSearch';

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

	if (posts.length === 0 && loading) return <div>Loading...</div>;

	return (
		<div>
			<ul>
				{posts.map((post, index) => {
					if (index === posts.length - 1)
						return (
							<li key={post.id} ref={lastElementRef}>
								{post.title}
							</li>
						);

					return <li key={index}>{post.title}</li>;
				})}
			</ul>
			{loading && <div>Loading...</div>}
		</div>
	);
}

export default App;
