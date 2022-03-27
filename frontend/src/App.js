import './App.css'
import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Home from './components/Home'
import Progress from './components/Progress'
import Access from './components/Access'
import Help from './components/Help'
import Kanban from './components/Kanban'

export default function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <Home>
              <Kanban/>
            </Home>
          }/>
          <Route path="/progress" element={
            <Home>
              <Progress/>
            </Home>
          }/>
          <Route path="/access" element={
            <Home>
              <Access/>
            </Home>
          }/>
          <Route path="/help" element={
            <Home>
              <Help/>
            </Home>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
