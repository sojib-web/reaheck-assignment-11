// @ts-nocheck
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../../assets/loog.png";
import { AuthContext } from "../../Context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    `block px-3 py-2 rounded-md font-semibold ${
      isActive ? "text-teal-700" : "text-gray-700"
    } hover:text-teal-700 transition`;

  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allServices" className={navLinkStyle}>
          Services
        </NavLink>
      </li>
    </>
  );

  const authLinks = user?.email ? (
    <>
      <li>
        <NavLink to="/services" className={navLinkStyle}>
          Add Service
        </NavLink>
      </li>
      <li>
        <NavLink to="/MyServices" className={navLinkStyle}>
          My Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/MyReviews" className={navLinkStyle}>
          My Reviews
        </NavLink>
      </li>
    </>
  ) : null;

  return (
    <div className="bg-base-200 text-base-content fixed top-0 left-0 right-0 z-50 px-4 py-2 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="ServiceShout"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold text-teal-700 ">ServiceShout</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-4 menu-horizontal">
          {commonLinks}
          {authLinks}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {user?.email ? (
            <>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  title={user.displayName || "User"}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
                />
              )}

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-rose-500 to-rose-700 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="">
                <button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
                  Login
                </button>
              </NavLink>

              <NavLink to="/register" className="">
                <button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-2 space-y-2 bg-white shadow-md rounded-md p-4">
          <ul className="space-y-2">
            {commonLinks}
            {authLinks}
          </ul>
          <div className="flex flex-col gap-2">
            {user?.email ? (
              <>
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    title={user.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500 mx-auto"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl shadow hover:from-cyan-600 hover:to-teal-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block text-center py-2 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl shadow"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block text-center py-2 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl shadow"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
