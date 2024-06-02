import { useState } from 'react'
import './App.css'

import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  

  return (
    <>
    <AuthProvider>
      <Navbar/>

      <Routes />
    </AuthProvider>
      
    </>
  )
}

export default App
