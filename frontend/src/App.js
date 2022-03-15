import './App.css';
import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import RequireAuth, {AuthProvider} from "./hooks/useAuth";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Progress from "./components/Progress";
import Team from "./components/Team";
import Help from "./components/Help";
import Kanban from "./components/Kanban";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
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
                    <Route path="/team" element={
                        <RequireAuth>
                            <Home>
                                <Team/>
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
    );
}
