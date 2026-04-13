import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../../index'

export const fetchUser = createAsyncThunk('users/fetchUser', async({id}: {id: number}) => {
	const response = await fetch(`${API_URL}/users/${id}`)
	const data = await response.json()
	return data
})
