import { createSlice } from '@reduxjs/toolkit'
import type { User } from './types'
import { fetchUser } from './thunks'

interface UsersState {
	users: User[]
	currentUser: User | null
	isLoading: boolean
	error: string | null
}
const initialState: UsersState = {
	users: [],
	currentUser: null,
	isLoading: false,
	error: null,
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.isLoading = false
			state.currentUser = action.payload
		})
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message || 'Failed to fetch user'
		})
	},
})

export const UsersReduser = usersSlice.reducer
