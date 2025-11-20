import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logoutUser, setCredentials } from '../../features/auth/authSlice.js'

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: 'include',
    
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.accessToken
        if(token){
            headers.set("Authorization", `Bearer ${token}`)
        }else{
            console.log("token not found")
        }
        return headers
    }
})



const baseQueryWithReauth = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 401){
        console.log("sending refresh token")
        

        const refreshResult = await baseQuery(
            {
                // Refresh token endpoint
                url: '/api/v1/users/refresh-token', 
                method: 'POST',
                body: {
                  refreshToken: api.getState().auth.user.refreshToken, // Refresh token stored in Redux
                },
              },
              api,
              extraOptions
            );
          
        console.log("refreshResult", refreshResult)

        if(refreshResult?.data?.data?.accessToken){
            const newAccessToken = refreshResult.data.data.accessToken;

            const currentUser = api.getState().auth.user;

            api.dispatch(setCredentials({
                user: currentUser,
                accessToken: newAccessToken
            }));
           
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logoutUser())
        }
    }
    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})


