import { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle, useOnClickOutside } from "../../hooks";
import { capitalize } from "../../utils";

export const Account = () => {
    const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname;

  const toggleDropdown = () => setOpen((prev) => !prev);
  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
      <div ref={dropdownRef} className='user'>
          <Link to='/signup' state={{from}}>
          <button className="btn icon-btn">
            <FaUserCircle />
            register
          </button>
          </Link>
      </div>
  )
}
