// @ts-nocheck
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router";

const Login = () => {
  const { LogIn, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    LogIn(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${result.user.email}!`,
          timer: 2000,
          showConfirmButton: false,
        });
        form.reset();
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          text: `Welcome, ${result.user.displayName || "User"}!`,
          timer: 1800,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: "Unable to sign in with Google. Please try again.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password with Icon Toggle */}
          <div className="mb-4 relative">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-neutral w-full mb-4">
            Login
          </button>
        </form>

        <div className="flex items-center justify-between mb-4">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="label-text">Keep me logged in</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="divider">Or Login With</div>

        <div className="flex justify-center gap-3 mt-3">
          <button className="btn btn-circle btn-sm bg-blue-700 text-white border-none">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="btn btn-circle btn-sm bg-sky-500 text-white border-none">
            <i className="fab fa-twitter"></i>
          </button>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-circle btn-sm bg-red-500 text-white border-none"
          >
            <i className="fab fa-google"></i>
          </button>
          <button className="btn btn-circle btn-sm bg-blue-800 text-white border-none">
            <i className="fab fa-linkedin-in"></i>
          </button>
          <button className="btn btn-circle btn-sm bg-pink-600 text-white border-none">
            <i className="fab fa-pinterest-p"></i>
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
