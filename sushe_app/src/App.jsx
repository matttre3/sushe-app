import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Init from "./components/Init";
import Register from "./components/Register";
import Joincreate from "./components/Joincreate";
import Joinpin from "./components/Joinpin";
import MyOrder from "./components/MyOrder";
import AllOrder from "./components/AllOrder";
import "./App.css";

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(localStorage.getItem(key) ?? defaultValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

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
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
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

        <Route
          path="/joincreate"
          element={<Joincreate isLoggedIn={isLoggedIn} />}
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
