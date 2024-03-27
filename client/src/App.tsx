import './App.css'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/UserContext'
import Dashboard from './pages/Dashboard'

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='app'>
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 6000}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
    </div>
  )
}

export default App
