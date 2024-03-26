import './App.css'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  

  return (
    <>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 6000}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
