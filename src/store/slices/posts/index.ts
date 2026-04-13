import { createSlice } from '@reduxjs/toolkit'
import { fetchPosts, fetchPost } from './thunks'

interface Post {
	userId: number
	id: number
	title: string
	body: string
}

interface PostsState {
	posts: Post[]
	currentPost: Post | null
	isLoading: boolean
	error: string | null
}

const initialState: PostsState = {
	posts: [],
	currentPost: null,
	isLoading: false,
	error: null,
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.isLoading = false
			state.posts = action.payload
		})
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message || 'Failed to fetch posts'
		})
		builder.addCase(fetchPost.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchPost.fulfilled, (state, action) => {
			state.isLoading = false
			state.currentPost = action.payload
		})
		builder.addCase(fetchPost.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message || 'Failed to fetch post'
		})
	},
})

export const PostsReduser = postsSlice.reducer