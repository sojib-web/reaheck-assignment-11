// @ts-nocheck
import React from "react";
import sideImage1 from "../../assets/meet1.png";
import DesignHive from "../../assets/DesignHive.png";
import SecurePay from "../../assets/SecurePay.png";

const partners = [
  {
    id: 1,
    name: "TechSpark Solutions",
    logo: sideImage1,
    description: "Provides backend infrastructure and cloud hosting.",
  },
  {
    id: 2,
    name: "DesignHive",
    logo: DesignHive,
    description: "Helped craft the user interface and brand visuals.",
  },
  {
    id: 3,
    name: "SecurePay",
    logo: SecurePay,
    description: "Integrated secure and reliable payment solutions.",
  },
];

const MeetOurPartners = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-4">
          Meet Our Partners
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          These trusted partners help power our platform and provide essential
          services to our users.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center transform hover:-translate-y-1"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-700 transition">
                {partner.name}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurPartners;
