import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery(),
    endpoints: builder => ({
        registerAuth: builder.mutation({
            async queryFn({ email, password }) {
                try {
                    const auth = getAuth();
                    const response = await createUserWithEmailAndPassword(auth, email, password)
                    return { data: response.user }
                } catch (err) {
                    return { error: err }
                }

            }
        }),

        loginAuth: builder.mutation({
            async queryFn({ email, password }) {
                try {
                    const auth = getAuth()
                    const response = await signInWithEmailAndPassword(auth, email, password)
                    return { data: response.user }
                } catch (err) {
                    return { error: err }
                }
            }
        })
    })

})

