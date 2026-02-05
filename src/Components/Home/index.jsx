import Header from "../Header";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Slide from "../Sliders";
import BannerCarousel from "../HomePageSider"; // Assuming this is the correct path for BannerCarousel
import Loader from "../loader"; // Corrected import path for Loader

const HomePage = () => {
  const [currentData, setData] = useState(null);
  const [originalsData, setOriginalsData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const fetchTrending = async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const response = await fetch("https://apis.ccbp.in/movies-app/trending-movies", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch trending movies");
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchOriginals = async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const res = await fetch("https://apis.ccbp.in/movies-app/originals", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (res.ok) {
        const net = await res.json();
        setOriginalsData(net);
      } else {
        console.error("Failed to fetch originals");
      }
    } catch (error) {
      console.error("Error fetching originals:", error);
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await fetchTrending();
      await fetchOriginals();
      setLoading(false);
    };
    loadAllData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <Header />
        <BannerCarousel />
      </div>

      <div className="bg-[#000000] w-screen">
 
        <div className="p-10">
          <h1 className="text-white text-[24px] font-bold mb-15">Trending Now</h1>
          
          <Slide data={currentData}  />
          
        </div>
        <div className="p-12">
          <h1 className="text-white text-[24px] font-bold mb-15">Originals</h1>
          <Slide data={originalsData} />
        </div>

        {/* Footer */}
        <div className="py-6 mt-auto border-t">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex space-x-4 text-gray-600">
              <a
                href="https://www.google.com"
                target="_blank"
                className="hover:text-blue-600 transition"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:text-pink-500 transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                className="hover:text-red-600 transition"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <p className="text-gray-500 text-[15px]">Contact Us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
