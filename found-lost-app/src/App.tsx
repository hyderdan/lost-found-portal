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
// import ScrollToTop from './hooks/ScrollTop'

function App() {

  return (
    <BrowserRouter>
        {/* <ScrollToTop/> */}
      <div className='min-h-screen '>
          <Navigation/>
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/searchItems' element = {<Search />} />
          <Route path='/postItem' element={<PostItem />} />
         <Route path='/login' element={<Login/>} />
         <Route path='/viewDetails/:id' element={<Viewdetails />} />
         <Route path='/register' element={<Register />} />
         <Route path='/admin' element={<Admin />} />

        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
