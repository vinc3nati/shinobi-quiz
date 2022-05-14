import { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { useOnClickOutside } from "../../hooks";
import { capitalize } from "../../utils";

export const Account = () => {
  const {
    userCredentials: { token },
    user,
    handleLogout,
  } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname;

  const toggleDropdown = () => setOpen((prev) => !prev);
  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div ref={dropdownRef} className="user">
      {!token && (
        <Link to="/signup" state={{ from }}>
          <button className="btn icon-btn">
            <FaUserCircle />
            register
          </button>
        </Link>
      )}

      {token && (
        <>
          <div className="account-name" onClick={toggleDropdown}>
            <span className="text-bold">
              {capitalize(user.name.split(" ")[0])}
            </span>
            <IoIosArrowDown />
          </div>
          {open && (
            <div className="account-dropdown text-center">
              <ul className="list">
                <li onClick={() => navigate("/profile")}>Account</li>
                <li onClick={handleLogout}>Sign Out</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
