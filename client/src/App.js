import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Schedule from "./pages/Schedule/Schedule";
import Seat from "./pages/Seat/Seat";
import News from "./pages/News/News";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./shared/layout/Layout";
import Payment from "./pages/Payment/Payment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const AppContext = createContext()
const App = () => {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/seats" element={<Seat />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <ToastContainer />
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
