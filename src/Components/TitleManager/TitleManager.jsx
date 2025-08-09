import { useEffect } from "react";
import { useLocation } from "react-router";

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const routeTitleMap = {
      "/": "Home | ServiceShout",
      "/login": "Login | ServiceShout",
      "/register": "Register | ServiceShout",
      "/services": "Add Service | ServiceShout",
      "/allServices": "All Services | ServiceShout",
      "/MyServices": "My Services | ServiceShout",
      "/MyReviews": "My Reviews | ServiceShout",
      // Add more if needed
    };

    const title = routeTitleMap[path] || "ServiceShout";
    document.title = title;
  }, [location.pathname]);

  return null; // This component doesn’t render anything
};

export default TitleManager;
