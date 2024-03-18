import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Init from "./components/Init";
import Register from "./components/Register";
import Joincreate from "./components/Joincreate";
import JoinPin from "./components/JoinPin";
import MyOrder from "./components/MyOrder";
import AllOrder from "./components/AllOrder";
import "./App.css";

function App() {
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [tablePin, setTablePin] = useLocalStorage("tablePin", "");

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
            <Joincreate
              userName={userName}
              logout={() => setUserName("")}
              tablePin={tablePin}
              setTablePin={setTablePin}
            />
          }
        />

        <Route
          path="/joinpin"
          element={<JoinPin setTablePin={setTablePin} />}
        />

        <Route
          path={`/:tableNumber/myorder`}
          element={
            <MyOrder
              userName={userName}
              tablePin={tablePin}
              setTablePin={setTablePin}
            />
          }
        />
        {/* ^^^^^^^  /:id/myorder qua si può fare routing dinamico */}

        <Route path="/:tableNumber/allorder" element={<AllOrder />} />
      </Routes>
    </>
  );
}

export default App;
