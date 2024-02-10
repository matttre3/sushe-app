import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Init from "./components/Init";
import Register from "./components/Register";
import Joincreate from "./components/Joincreate";
import Joinpin from "./components/Joinpin";
import MyOrder from "./components/MyOrder";
import AllOrder from "./components/AllOrder";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Init
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
            />
          }
        />

        <Route path="/joincreate" element={<Joincreate />} />

        <Route path="/joinpin" element={<Joinpin />} />

        <Route path="/myorder" element={<MyOrder />} />

        <Route path="/allorder" element={<AllOrder />} />
      </Routes>
    </>
  );
}

export default App;
