import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../../services/apis/authApi";
import { cartApi } from "../../services/apis/cartApi";
import { productsApi } from "../../services/apis/productsApi";
import { authSlice } from "./auth/authSlice";
import { cartToggleSlice } from "./shopping-cart/cartToggleSlice";

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [cartToggleSlice.name]: cartToggleSlice.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
            .concat(productsApi.middleware)
            .concat(cartApi.middleware)
            .concat(authApi.middleware)
});

setupListeners(store.dispatch)

// ************************************************ All Api Hooks Exports ****************************************************

export const { useRegisterAuthMutation, useLoginAuthMutation } = authApi

export const { useAddItemToCartMutation, useDeleteItemFromCartMutation, useGetCartItemsQuery, useUpdateItemInCartMutation, useGetCartItemByIdQuery } = cartApi

export const { useGetProductsQuery, useGetProductDetailQuery } = productsApi

// *************************************************** All Slice Exports **************************************************

export const cartToggleActions = cartToggleSlice.actions;
export const authSliceActions = authSlice.actions


