import './App.css'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SlumparenPage from './pages/SlumparenPage'
import CalendarPage from './pages/CalendarPage'



function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/menu' element={<MenuPage/>}/>
        <Route path='/slumparen' element={<SlumparenPage/>}/>
        <Route path='/calendar' element={<CalendarPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
