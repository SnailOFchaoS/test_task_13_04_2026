import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UsersState } from './types'
import { fetchUser } from './thunks'

const initialState: UsersState = {
	users: [],
	currentUser: null,
	isLoading: false,
	error: null,
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setCurrentUserFromCache: (state, action: PayloadAction<number>) => {
			const user = state.users[action.payload]
			state.currentUser = user ?? null
			state.isLoading = false
			state.error = null
		}
	},

	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.isLoading = false
			state.currentUser = action.payload
			state.users[action.payload.id] = action.payload
		})
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message || 'Failed to fetch user'
		})
	},
})

export const UsersReduser = usersSlice.reducer
export const { setCurrentUserFromCache } = usersSlice.actions