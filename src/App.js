import React from "react";
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
import Profile from "./pages/user/profile";

import LoginRoute from "./components/LoginRoute";
import Postedjobs from "./pages/user/postedjobs";
import NewEditJob from "./pages/user/postedjobs/NewEditJob";
import AllJobs from "./pages/admin/AllJobs";
import AllUsers from "./pages/admin/AllUser";
import JobDescription from "./pages/JobDescription";

function App() {
  const loading = useSelector(selectLoadingState);
  // const user =  {
  //   id : "public"
  //  }

  //  localStorage.setItem("user"  , JSON.stringify(user))

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
            path="/job-description/:id"
            element={
              <PublicRoute>
                <JobDescription />
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
                <Postedjobs />
              </PublicRoute>
            }
          />

          <Route
            path="/posted-jobs/new"
            element={
              <PublicRoute>
                <NewEditJob />
              </PublicRoute>
            }
          />

          <Route
            path="/posted-jobs/edit/:id"
            element={
              <PublicRoute>
                <NewEditJob />
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

          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AllJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
