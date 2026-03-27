import './App.css'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SlumparenPage from './pages/SlumparenPage'
import CalendarPage from './pages/CalendarPage'
import StatisticPage from './pages/StatisticPage'



function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/menu' element={<MenuPage/>}/>
        <Route path='/slumparen' element={<SlumparenPage/>}/>
        <Route path='/calendar' element={<CalendarPage />}/>
        <Route path='/statistik' element={<StatisticPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
