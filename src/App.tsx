import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer, Loader, Navbar, PrivateRoute, ScrollTop } from "./components";
import { useLoader } from "./contexts";
import {
  Category,
  Dashboard,
  Error,
  Home,
  LeaderBoard,
  Login,
  Profile,
  Questions,
  Result,
  Rules,
  Signup,
} from "./pages";
import "./App.css";

function App() {
  const { showLoader } = useLoader();
  const { pathname } = useLocation();
  return (
    <>
      {showLoader && <Loader />}
      {(pathname === "/" ||
        pathname === "/profile" ||
        pathname === "/category" ||
        pathname === "/leaderboard" ||
        pathname === "/dashboard") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home title="home" />} />
        <Route path="/login" element={<Login title="login" />} />
        <Route path="/signup" element={<Signup title="signup" />} />
        <Route path="/profile" element={<Profile title="profile" />} />
        <Route path="/category" element={<Category title="category" />} />
        <Route path="/:quizId">
          <Route
            path="rules"
            element={
              <PrivateRoute>
                <Rules title="rules" />
              </PrivateRoute>
            }
          />
          <Route
            path=":questionIdx"
            element={
              <PrivateRoute>
                <Questions title="questions" />
              </PrivateRoute>
            }
          />
          <Route
            path="result"
            element={
              <PrivateRoute>
                <Result title="result" />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/leaderboard"
          element={<LeaderBoard title="leader board" />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard title="dashboard" />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error title="Error" />} />
        <Route path="/error" element={<Error title="Error" />} />
      </Routes>
      <ToastContainer style={{ fontWeight: "500", fontSize: "2rem" }} />
      <ScrollTop />
      <Footer />
    </>
  );
}
export default App;
