import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Dashboard from "./components/Dashboard"
import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import Protected from "./components/auth/Protected"
import Profile from "./components/Profile.jsx"
import Layout from "./components/Layout.jsx"

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import ForgotPassword from './components/auth/ForgotPassword.jsx'
import UpdatePassword from './components/auth/UpdatePassword.jsx'
import Profile from './components/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<App />}>
        <Route path='signup' element={<SignUp />}/>
        <Route path='login' element={<Login />}/>
        <Route path='forgotpassword' element={<ForgotPassword />}/>
        <Route path='/' element={<Protected />} >
          {/* Outlet in protected.jsx will render Layout automatically bc of path of '/' */}
          <Route path='/' element={<Layout />}>
            {/* profile will get rendered with dashboard if its clicked */}
            <Route path='profile' element={<Profile />}/> 
          </Route>
        </Route>
          <Route path='/profile' element={<Profile />}/>
          <Route path='updatepassword' element={<UpdatePassword />}/>
    </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
