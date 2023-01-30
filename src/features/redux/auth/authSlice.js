import { createSlice } from "@reduxjs/toolkit";

export const isTokenPresent = localStorage.getItem('token')

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isLoggedIn: !!isTokenPresent,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true
            if (state.token) {
                localStorage.setItem('token', state.token)
            }
        },
        logout: (state) => {
            state.token = null
            state.isLoggedIn = false
            localStorage.removeItem('token')
        }
    }
})

