// @ts-nocheck
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const { signUp, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    // Password Validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
      let message = "Password must:\n";
      if (!hasUpperCase) message += "• Include at least one UPPERCASE letter\n";
      if (!hasLowerCase) message += "• Include at least one lowercase letter\n";
      if (!hasMinLength) message += "• Be at least 6 characters long";
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: message,
      });
      return;
    }

    signUp(email, password)
      .then((result) =>
        updateUserProfile({ displayName: name, photoURL }).then(() => result)
      )
      .then((result) => {
        const userData = {
          uid: result.user.uid,
          name,
          photoURL,
        };
        return fetch(
          "https://service-review-system-server-nine.vercel.app/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save user info to database");
        }
        return res.json();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Welcome aboard!",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
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
    <div className="min-h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-3xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-500"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          <button type="submit" className="btn btn-neutral w-full">
            Register
          </button>
        </form>

        <div className="divider">Or Register With</div>
        <div className="flex justify-center gap-3">
          <button className="btn btn-circle bg-blue-600 text-white">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="btn btn-circle bg-sky-500 text-white">
            <i className="fab fa-twitter"></i>
          </button>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-circle bg-red-500 text-white"
          >
            <i className="fab fa-google"></i>
          </button>
          <button className="btn btn-circle bg-blue-800 text-white">
            <i className="fab fa-linkedin-in"></i>
          </button>
          <button className="btn btn-circle bg-pink-600 text-white">
            <i className="fab fa-pinterest-p"></i>
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
