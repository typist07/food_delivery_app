import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const cartApi = createApi({
    reducerPath: 'cart',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['carts'],
    endpoints: (builder) => ({
        getCartItems: builder.query({
            async queryFn() {
                try {
                    const query = await getDocs(collection(db, "cart"))
                    let cartItems = [];
                    query?.forEach((item) => {
                        cartItems.push(item.data())
                    })
                    return { data: cartItems }
                } catch (err) {
                    return { error: err }
                }
            },
            providesTags: ['carts']
        }),
        addItemToCart: builder.mutation({
            async queryFn(data) {
                try {
                    await setDoc(doc(db, "cart", data.id), {
                        id: data.id,
                        ...data
                    })
                    return { data: 'ok' }
                } catch (err) {
                    return { error: err }
                }
            },
            invalidatesTags: ['carts']
        }),
        deleteItemFromCart: builder.mutation({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, "cart", id))
                    return { data: 'ok' }
                } catch (err) {
                    return { error: err }
                }
            },
            invalidatesTags: ['carts']
        }),
        updateItemInCart: builder.mutation({
            async queryFn(data) {
                console.log(data)
                try {
                    await updateDoc(doc(db, "cart", data.id), {
                        ...data
                    })
                    return { data: data }
                } catch (err) {
                    return { error: err }
                }
            },
            invalidatesTags: ['carts']
        }),
        getCartItemById: builder.query({
            async queryFn(id) {
                try {
                    const product = await getDoc(doc(db, "cart", id))
                    return { data: product.data() }
                } catch (err) {
                    return { error: err }
                }
            },
            invalidatesTags: ['carts']
        })
    })
})