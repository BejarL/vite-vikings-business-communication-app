import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard"

// function App() {
//   return (
//     <>
//       <Login />
//       <SignUp />
//       <Dashboard />
//     </>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App