import React from "react";
// @ts-ignore
import logo from "../../assets/loog.png";
import { NavLink } from "react-router";

const Footer = () => {
  const linkStyle = "transition hover:text-teal-600 text-gray-600";

  const navLinkStyle = ({ isActive }) =>
    `${linkStyle} ${isActive ? "font-semibold text-teal-600" : ""}`;

  return (
    <footer className="bg-base-200 text-base-content py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center mb-4 space-x-2">
            <img src={logo} alt="ServiceShout Logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold text-teal-700 ">ServiceShout</h2>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Connecting users with the best services, reviews, and experiences.
            Empowering businesses and customers through real feedback.
          </p>
          <p className="text-sm text-gray-600">
            From home services to personal care, we're building transparency and
            trust—one shout at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="footer-title mb-3">Pages</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allServices" className={navLinkStyle}>
                All Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={navLinkStyle}>
                Add Services
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
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="footer-title mb-3">Social</h3>
          <ul className="space-y-2">
            {["Facebook", "LinkedIn", "Twitter", "Instagram"].map(
              (platform) => (
                <li key={platform}>
                  <a href="#" className={linkStyle}>
                    {platform}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter + Contact */}
        <div>
          <h3 className="footer-title mb-3">Newsletter</h3>
          <form className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-sm">
                Subscribe to get updates
              </span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full pr-24 text-sm"
              />
              <button className="btn bg-teal-700  text-white hover:bg-teal-900  absolute top-0 right-0 rounded-l-none text-sm">
                Subscribe
              </button>
            </div>
          </form>
          <div className="mt-4">
            <span className="footer-title">Contact</span>
            <p className="text-sm text-teal-700  mt-1">email@example.com</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()}{" "}
        <strong className="text-teal-700">ServiceShout</strong>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
