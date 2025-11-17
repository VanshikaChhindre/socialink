import { Routes, Route } from "react-router-dom"
import PageLayout from "./pages/pageLayout"
import { HeroSection, SignUp, Login, OnboardingConnect } from "./components/export"


function App() {

  return (
   <Routes>
        <Route element={<PageLayout/>}>
          <Route path="/" element={<HeroSection/>}/>
          <Route path="/on-boarding" element={<OnboardingConnect/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
    </Routes>
  )
}

export default App
