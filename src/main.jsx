import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Dashboard from "./components/Dashboard"
import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import Protected from "./components/auth/Protected"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route path='signup' element={<SignUp />}/>
        <Route path='login' element={<Login />}/>
        <Route path='/' element={<Protected />} >
          <Route path='/' element={<Dashboard />}/>
        </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
