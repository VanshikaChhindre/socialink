import { Routes, Route } from "react-router-dom"
import PageLayout from "./pages/pageLayout"
import { HeroSection, SignUp, Login, OnboardingConnect, Socials } from "./components/export"
import { useDispatch } from "react-redux"
import { logoutUser, setCredentials } from "./features/auth/authSlice.js"
import { useEffect } from "react"

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/users/current-user", {
          credentials: "include",
        })

        if (res.status === 200) {
          const data = await res.json()
          if (data?.user) {
            // refresh Redux user object
            dispatch(
              setCredentials({
                user: data.user,
                accessToken: null, // token will already be sent in cookies
              })
            )
          }
        } else {
          // user session is invalid (tokens expired, logged out, etc.)
          dispatch(logoutUser())
        }
      } catch (err) {
        dispatch(logoutUser())
      }
    }

    verifySession()
  }, [dispatch])


  return (
   <Routes>
        <Route element={<PageLayout/>}>
          <Route path="/" element={<HeroSection/>}/>
          <Route path="/on-boarding" element={<OnboardingConnect/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
           <Route path="/socials" element={<Socials/>}/>
        </Route>
    </Routes>
  )
}

export default App
