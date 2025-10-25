import './App.css'
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Welcome from './Pages/welcome';
import Signup from "./Pages/Signup";
import Login from "./Pages/login";
import Home from './Pages/Home';
import Create from './Pages/Create';
import Edit from './Pages/edit';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/edit" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
