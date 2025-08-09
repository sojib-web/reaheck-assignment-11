// @ts-nocheck
import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import TitleManager from "../Components/TitleManager/TitleManager";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TitleManager />
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow px-4 md:px-8 mt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
