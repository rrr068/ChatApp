import './App.css'
import Page from './components/Page'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/page' element={<Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
