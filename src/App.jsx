import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard"
import SignUp from "./components/SignUp"


function App() {
  return (
    <>
      <Login />
      <SignUp />
    </>
  )
}

export default App