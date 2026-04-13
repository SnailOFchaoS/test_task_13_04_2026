import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { fetchPosts, fetchPost } from './thunks'
import type { PostsState } from './types'

export type { Post } from './types'

export const makePostsListCacheKey = (page: number, limit: number): string =>
	`${page}:${limit}`

const initialState: PostsState = {
	totalCount: 0,
	posts: [],
	postsByQuery: {},
	postsById: {},
	currentPost: null,
	isLoading: false,
	error: null,
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		applyListFromCache: (
			state,
			action: PayloadAction<{ page: number; limit: number }>,
		) => {
			const key = makePostsListCacheKey(action.payload.page, action.payload.limit)
			const row = state.postsByQuery[key]
			if (row) {
				state.posts = row.posts
				state.totalCount = row.totalCount
				state.isLoading = false
				state.error = null
			}
		},
		setCurrentPostFromCache: (state, action: PayloadAction<number>) => {
			const post = state.postsById[action.payload]
			state.currentPost = post ?? null
			state.isLoading = false
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			const { page, limit } = action.meta.arg
			const key = makePostsListCacheKey(page, limit)
			const { posts, totalCount } = action.payload

			state.postsByQuery[key] = { posts, totalCount }
			for (const p of posts) {
				state.postsById[p.id] = p
			}
			state.isLoading = false
			state.posts = posts
			state.totalCount = totalCount
			state.error = null
		})
		builder.addCase(fetchPosts.rejected, (state, action) => {
			if (action.meta.aborted || action.error.name === 'AbortError') {
				return
			}
			state.isLoading = false
			state.error = action.error.message || 'Failed to fetch posts'
		})
		builder.addCase(fetchPost.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchPost.fulfilled, (state, action) => {
			const post = action.payload
			state.isLoading = false
			state.currentPost = post
			state.postsById[post.id] = post
			state.error = null
		})
		builder.addCase(fetchPost.rejected, (state, action) => {
			if (action.meta.aborted || action.error.name === 'AbortError') {
				return
			}
			state.isLoading = false
			state.error = action.error.message || 'Failed to fetch post'
		})
	},
})

export const PostsReduser = postsSlice.reducer
export const { applyListFromCache, setCurrentPostFromCache } = postsSlice.actions
