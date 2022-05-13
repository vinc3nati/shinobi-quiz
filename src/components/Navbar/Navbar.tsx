import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Account } from "../Account/Account";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="main">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" className="img img-responsive" />
          </Link>
        </div>
        <ThemeSwitcher />
        <Account />
      </div>
    </nav>
  )
}
