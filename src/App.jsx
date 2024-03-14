import React from 'react'
import ComplaintForm from './pages/ComplaintForm'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='app'>
      <ComplaintForm/>
      <ToastContainer/>
      
    </div>
  )
}

export default App
