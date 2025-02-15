import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home/Home";
import Login from "./pages/user/login/Login";
import Signup from "./pages/user/signup/Signup";
import Details from "./pages/user/details/Details";
import Header from "./globalComponents/Header";
import Allmovies from "./pages/admin/all movies/Allmovies";
import Users from "./pages/admin/all users/Users";
import Alltheaters from "./pages/admin/all theters/Alltheaters";
import Request from "./pages/admin/all requests/Request";

function NotFound() {
  return <div>404 - Page Not Found</div>;
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "mydarktheme";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, [window.reload]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/details/:id"
          element={
            <>
              <Header />
              <Details />
            </>
          }
        />

        {/* admin routes */}
        <Route path="/admin" element={<Users />} />
        <Route path="/admin/allmovies" element={<Allmovies />} />
        <Route path="/admin/alltheaters" element={<Alltheaters />} />
        <Route path="/admin/requests" element={<Request />} />

        {/*theater owner routes */}
        <Route path="/theaterowner" element={<Users />} />
        <Route path="/theaterowner/allmovies" element={<Allmovies />} />
        <Route path="/theaterowner/alltheaters" element={<Alltheaters />} />
        <Route path="/theaterowner/addmovie" element={<Request />} />
        <Route path="/theaterowner/managetheater" element={<Request />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
