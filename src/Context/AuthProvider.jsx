// @ts-nocheck
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/Firebase_config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        axios
          .post(
            `https://service-review-system-server-nine.vercel.app/jwt`,
            {
              email: currentUser.email,
            },
            { withCredentials: true }
          )
          .then((res) => console.log("JWT Token Set:", res.data))
          .catch((error) => console.log("JWT error:", error));
      }
    });

    return () => unsubscribe();
  }, []);

  // Register user
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email/password
  const LogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update user profile
  const updateUserProfile = ({ displayName, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  // Google Login
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userInfo = {
    user,
    loading,
    signUp,
    LogIn,
    googleLogin,
    logOut,
    updateUserProfile,
    setLoading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
