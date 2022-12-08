import React, { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import { selectLoadingState } from "./redux/slice/alertSlice";
import Loader from "./components/Loader";
import AppliedJobs from "./pages/user/AppliedJobs";
import Profile from "./pages/profile";
import { PostedJobs } from "./pages/user/PostedJobs";
import LoginRoute from "./components/LoginRoute";

function App() {
  const loading = useSelector(selectLoadingState);

  return (
    <div className="justify-center font-bold">
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
          <Route
            path="/register"
            element={
              <LoginRoute>
                <Register />
              </LoginRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
               </PublicRoute>
            }
          />
             <Route
            path="/applied-jobs"
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
             <Route
            path="/posted-jobs"
            element={
              <PublicRoute>
                <PostedJobs />
              </PublicRoute>
            }
          />
               <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
