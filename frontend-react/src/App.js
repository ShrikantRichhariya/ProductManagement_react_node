import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Productcomponent from "./components/Productcomponent";
import Userlogin from "./components/Userlogin";
import Add from "./components/Add";
import Listtable from "./components/Listtable";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Productcomponent />}>
            <Route path="/" element={<Listtable />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/logout" element={<h1> Logout Component</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/Userlogin" element={<Userlogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
