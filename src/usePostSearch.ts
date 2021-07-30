import { useEffect, useState } from 'react';
import axios from 'axios';

interface PostResponse {
	userId: number;
	id: number;
	title: string;
	body: string;
}

interface User {
	id: number;
	name: string;
	username: string;
}

interface Post extends PostResponse, User {}

const API = 'https://jsonplaceholder.typicode.com';

export default function usePostSearch(page: number, limit: number) {
	const [posts, setPosts] = useState<Post[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	let userIds: number[];

	useEffect(() => {
		(async () => {
			setLoading(true);
			setError(false);

			const { data }: { data: Post[] } = await axios.get(`${API}/posts`, {
				params: {
					_page: page,
					_limit: limit,
				},
			});
			setHasMore(data.length > 0);

			let set = new Set(data.map(p => p.userId));
			userIds = Array.from(set);

			let usersFromId: any[] = [];

			for (let id of userIds) {
				const user = users.find(u => u.id === id);
				if (user) continue;

				let { data: userData } = await axios.get(`${API}/users/${id}`);
				usersFromId.push(userData);
			}
			const newUserList = [...users, ...usersFromId];
			setUsers(newUserList);

			const final = data.map(post => {
				const user = newUserList.find(user => user.id === post.userId);
				return {
					...post,
					username: user?.username,
					name: user?.name,
				};
			});

			if (final) setPosts([...posts, ...final]);
			setLoading(false);
		})();
	}, [page, limit]);

	return { posts, loading, error, hasMore };
}
