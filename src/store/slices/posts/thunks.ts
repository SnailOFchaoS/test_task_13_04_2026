import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../../index'


export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async ({ page, limit }: { page: number; limit: number }, {signal}) => {
		const response = await fetch(
			`${API_URL}/posts?_page=${page}&_limit=${limit}`, {signal})
		const totalCountRaw = response.headers.get('X-Total-Count')
		const totalCount = totalCountRaw ? Number(totalCountRaw) : 0
		const posts = await response.json()
		return { posts, totalCount }
	},
)

export const fetchPost = createAsyncThunk('posts/fetchPost', async({id}: {id: number}) => {
	const response = await fetch(`${API_URL}/posts/${id}`)
	const data = await response.json()
	return data
})