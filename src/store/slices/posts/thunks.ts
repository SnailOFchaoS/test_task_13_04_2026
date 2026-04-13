import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../../index'

import type { Post } from './types'

export const fetchPosts = createAsyncThunk<
	{ posts: Post[]; totalCount: number },
	{ page: number; limit: number }
>('posts/fetchPosts', async ({ page, limit }, { signal }) => {
	const response = await fetch(
		`${API_URL}/posts?_page=${page}&_limit=${limit}`,
		{ signal },
	)
	const totalCountRaw = response.headers.get('X-Total-Count')
	const totalCount = totalCountRaw ? Number(totalCountRaw) : 0
	const posts = await response.json()
	return { posts, totalCount }
})

export const fetchPost = createAsyncThunk<Post, { id: number }>(
	'posts/fetchPost',
	async ({ id }) => {
		const response = await fetch(`${API_URL}/posts/${id}`)
		return await response.json()
	},
)