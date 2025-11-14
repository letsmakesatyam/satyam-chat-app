import React , {useEffect} from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import {Loader2} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx' 
import { useAuthStore } from './store/useAuthStore.js'

const App = () => {
  const {authUser , checkAuth , isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  if(isCheckingAuth  && !authUser){
    return(
       <div
        data-theme="synthwave"
        className="flex flex-col items-center justify-center h-screen bg-base-100 text-secondary"
      >
        <Loader2 className="w-12 h-12 animate-spin text-secondary drop-shadow-[0_0_10px_#f000b8]" />
        <p className="mt-4 text-lg font-semibold tracking-widest text-secondary-content animate-pulse">
          Initializing Synthwave Mode...
        </p>
      </div>
    )
  }
  return (
    <div data-theme="synthwave">

      <Navbar />
      <Routes>
        <Route path='/' element={ authUser? <HomePage/> : <Navigate to="/login" /> } />
        <Route path="/signup" element={ !authUser? <SignupPage/> : <Navigate to="/" /> } />
        <Route path="/login" element={ !authUser? <LoginPage/> : <Navigate to="/" /> } />
        <Route path="/settings" element={  <SettingsPage/>} />
        <Route path="/profile" element={ authUser ? <ProfilePage/>: <Navigate to= "/login" /> } />
      </Routes>
    <Toaster />
    </div>  
  )
}

export default App
