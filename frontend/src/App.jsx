import {BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
