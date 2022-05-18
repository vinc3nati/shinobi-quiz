import { Link, useNavigate } from "react-router-dom";
import { AiFillTrophy } from "react-icons/ai";
import { FaFlipboard } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Account } from "../Account/Account";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="main">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" className="img img-responsive" />
          </Link>
        </div>
        <div className="nav-links">
          <FaFlipboard
            title="Dashboard"
            onClick={() => navigate("/dashboard")}
            className="nav-icon"
          />
          <AiFillTrophy
            title="Leader board"
            onClick={() => navigate("/leaderboard")}
            className="nav-icon"
          />
          <ThemeSwitcher />
        </div>
        <Account />
      </div>
    </nav>
  );
};
