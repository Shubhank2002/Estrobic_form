import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewForm from './Components/NewForm'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {
  

  return (
    <>
     <Router>
      <Routes>
        <Route index element={<NewForm/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
