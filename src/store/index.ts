import { configureStore } from '@reduxjs/toolkit'
import { PostsReduser, UsersReduser } from './slices'

export const API_URL = 'https://jsonplaceholder.typicode.com'

export const store = configureStore({
	reducer: {
		posts: PostsReduser,
		users: UsersReduser,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch