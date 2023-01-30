import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        getProducts: builder.query({
            async queryFn() {
                try {
                    const query = await getDocs(collection(db, "products"))
                    let products = [];
                    query?.forEach((doc) => {
                        products.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    return { data: products }
                } catch (err) {
                    return { error: err }
                }
            }
        }),

        getProductDetail: builder.query({
            async queryFn(id) {
                try {
                    const product = await getDoc(doc(db, "products", id))
                    return { data: product.data() }
                }
                catch (err) {
                    return { error: err }
                }
            }
        })
    })
})


