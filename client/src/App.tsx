import './App.css'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/ui/Navbar/Navbar'
import Footer from './components/ui/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/UserContext'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {  
  const [dark, setDark] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDark(!dark)
  }

  return (
    <div className={dark ? "app dark" : "app"}>
    <UserContextProvider>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={dark}/>
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </UserContextProvider>
    </div>
  )
}

export default App
