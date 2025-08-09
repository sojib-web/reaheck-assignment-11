// @ts-nocheck
import React from "react";
import BannerSlider from "./BannerSlider";
import FeaturedServices from "../Components/FeaturedServices/FeaturedServices";
import MeetOurPartners from "../Components/MeetOurPartners/MeetOurPartners";
import WhyChooseUs from "../Components/WhyChooseUs/WhyChooseUs";
import HowItWorks from "../Components/HowItWorks/HowItWorks";
import { useLoaderData } from "react-router";

const Home = () => {
  const servicesData = useLoaderData();
  // console.log(servicesData);
  return (
    <div className="mt-20">
      <BannerSlider></BannerSlider>
      <FeaturedServices servicesData={servicesData}></FeaturedServices>
      <MeetOurPartners></MeetOurPartners>
      <WhyChooseUs servicesData={servicesData}></WhyChooseUs>
      <HowItWorks />
    </div>
  );
};

export default Home;
