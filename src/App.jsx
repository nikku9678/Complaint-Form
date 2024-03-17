import React from 'react'
import ComplaintForm from './pages/ComplaintForm'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import File from './pages/File';
const App = () => {
  return (
    <div className='app'>
      <ComplaintForm/>
      {/* <File/> */}
      <ToastContainer/>
      
    </div>
  )
}

export default App
