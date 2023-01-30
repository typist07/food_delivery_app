import { createSlice } from "@reduxjs/toolkit";

export const cartToggleSlice = createSlice({
    name: "cartUi",
    initialState: { cartIsVisible: false },

    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
    },
});

