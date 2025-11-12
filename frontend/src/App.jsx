import React , {useEffect} from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx' 
import { useAuthStore } from './store/useAuthStore.js'
const App = () => {
  const {authUser , checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div data-theme="synthwave">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/Profile" element={<ProfilePage/>} />
      </Routes>
    
    </div>
  )
}

export default App
