import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Dashboard from './pages/Dashboared'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import Search from './pages/Search'
import PostItem from './pages/PostItem'
import Login from './pages/Login'
import Register from './pages/Register'
import Viewdetails from './pages/Viewdetails'
import Admin from './pages/Admin'
import Pagetransition from './components/Pagetransition'
import ProtectRoute from './components/ProtectRoute'
// import ScrollToTop from './hooks/ScrollTop'


function App() {

  return (
    <BrowserRouter>
      {/* <ScrollToTop/> */}
      <div className='min-h-screen '>
        <Navigation />
        {/* <Pagetransition> */}
            <Routes>
            <Route path='/' element={<ProtectRoute><Home /></ProtectRoute>} />
            <Route path='/Dashboard' element={<ProtectRoute><Dashboard /></ProtectRoute>} />
            <Route path='/searchItems' element={<ProtectRoute><Search /></ProtectRoute>} />
            <Route path='/postItem' element={<ProtectRoute><PostItem /></ProtectRoute>} />
            <Route path='/viewDetails/:id' element={<ProtectRoute><Viewdetails /></ProtectRoute>} />
            <Route path='/admin' element={<ProtectRoute><Admin /></ProtectRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            </Routes>
        {/* </Pagetransition> */}
      </div>
    </BrowserRouter>

  )
}

export default App
