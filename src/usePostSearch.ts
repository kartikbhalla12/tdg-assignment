import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}
const API = 'https://jsonplaceholder.typicode.com';

export default function usePostSearch(page: number, limit: number) {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);
		axios
			.get(`${API}/posts`, {
				params: {
					_page: page,
					_limit: limit,
				},
			})
			.then(({ data }: { data: Post[] }) => {
				setHasMore(data.length > 0);
				setPosts([...posts, ...data]);
				setLoading(false);
			})
			.catch(() => setError(true));
	}, [page, limit]);

	return { posts, loading, error, hasMore };
}
