import { apiSlice } from "../../app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
          query: (credentials) => ({
            url: '/api/v1/users/signup',
            method: 'POST',
            body: {...credentials},
           
          }),
        }),

        login: builder.mutation({
          query: (credentials) => ({
            url: '/api/v1/users/login',
            method: 'POST',
            body: { ...credentials }
          }),
        }),

        logout: builder.mutation({
          query: ()=>({
            url: '/api/v1/users/logout',
            method: 'POST'
          })
        }),
         currentUser: builder.query({
          query: ()=>({
            url: '/api/v1/users/current-user',
            method: 'GET'
          })
        }),
      }),
    });

export const { 
  useSignupMutation, 
  useLoginMutation, 
  useLogoutMutation,
  useCurrentUserQuery,
} = authApiSlice;