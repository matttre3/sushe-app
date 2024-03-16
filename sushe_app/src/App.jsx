import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Init from "./components/Init";
import Register from "./components/Register";
import Joincreate from "./components/Joincreate";
import Joinpin from "./components/Joinpin";
import MyOrder from "./components/MyOrder";
import AllOrder from "./components/AllOrder";
import "./App.css";

function App() {
  const [userName, setUserName] = useLocalStorage("userName", "");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Init userName={userName} setUserName={setUserName} />}
        />
        <Route
          path="/register"
          element={<Register userName={userName} setUserName={setUserName} />}
        />

        <Route
          path="/joincreate"
          element={
            <Joincreate userName={userName} logout={() => setUserName("")} />
          }
        />

        <Route path="/joinpin" element={<Joinpin />} />

        <Route path="/myorder" element={<MyOrder />} />
        {/* ^^^^^^^  /:id/myorder qua si può fare routing dinamico */}

        <Route path="/allorder" element={<AllOrder />} />
      </Routes>
    </>
  );
}

export default App;
