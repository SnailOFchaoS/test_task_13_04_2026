export interface Post {
	userId: number
	id: number
	title: string
	body: string
}

export interface CachedPostsList {
	posts: Post[]
	totalCount: number
}

export interface PostsState {
	totalCount: number
	posts: Post[]
	postsByQuery: Record<string, CachedPostsList>
	postsById: Record<number, Post>
	currentPost: Post | null
	isLoading: boolean
	error: string | null
}