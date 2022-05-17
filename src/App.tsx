import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer, Loader, Navbar, ScrollTop } from "./components";
import "./App.css";
import { useLoader } from "./contexts";
import { Category, Home, Login, Profile, Signup } from "./pages";
import { Rules } from "./pages/Rules/Rules";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

function App() {
  const { showLoader } = useLoader();
  const { pathname } = useLocation();
  return (
    <>
      {showLoader && <Loader />}
      {pathname !== "/login" && pathname !== "/signup" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home title="home" />} />
        <Route path="/login" element={<Login title="login" />} />
        <Route path="/signup" element={<Signup title="signup" />} />
        <Route path="/profile" element={<Profile title="profile" />} />
        <Route path="/category" element={<Category title="profile" />} />
        <Route path="/:quizId">
          <Route
            path="rules"
            element={
              <PrivateRoute>
                <Rules title="rules" />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer style={{ fontWeight: "500", fontSize: "2rem" }} />
      <ScrollTop />
      <Footer />
    </>
  );
}
export default App;
