import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer, Loader, Navbar, ScrollTop } from "./components";
import "./App.css";
import { useLoader } from "./contexts";
import { Home, Login, Profile, Signup } from "./pages";

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
      </Routes>
      <ToastContainer style={{ fontWeight: "500", fontSize: "2rem" }} />
      <ScrollTop />
      <Footer />
    </>
  );
}
export default App;
