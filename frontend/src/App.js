import './App.css'
import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RequireAuth, { AuthProvider } from './hooks/useAuth'
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
            <RequireAuth>
              <Home>
                <Kanban/>
              </Home>
            </RequireAuth>
          }/>
          <Route path="/progress" element={
            <RequireAuth>
              <Home>
                <Progress/>
              </Home>
            </RequireAuth>
          }/>
          <Route path="/access" element={
            <RequireAuth>
              <Home>
                <Access/>
              </Home>
            </RequireAuth>
          }/>
          <Route path="/help" element={
            <RequireAuth>
              <Home>
                <Help/>
              </Home>
            </RequireAuth>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
