import React, { useState, useEffect } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // loader state
  const [profileData, setProfileData] = useState(null);

  // Simulate fetching profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Replace this with your actual API call if available
        const data = {
          email: "rahul@gmail.com",
          plan: "Premium ULTRA HD",
        };
        // Simulate network delay
        await new Promise((res) => setTimeout(res, 800));
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  if (loading) return <Loader />; // show loader while fetching

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="m-25">
        <h1 className="font-HK Grotesk font-bold text-[36px] font-700 mb-3">Account</h1>
        <hr className="text-[#CBD5E1]" />
        <div className="flex mt-5">
          <h1 className="font-HK Grotesk font-bold text-[20px] font-700 text-[#CBD5E1]">Membership</h1>
          <div className="flex flex-col ml-7 mt-1">
            <h2>{profileData.email}</h2>
            <div className="mt-3">
              <h1 className="font-HK Grotesk font-bold text-[17px] font-700 text-[#CBD5E1]">
                Password : **********
              </h1>
            </div>
          </div>
        </div>
        <hr className="text-[#CBD5E1] mt-5" />
        <div className="flex mt-5">
          <p className="font-HK Grotesk font-bold text-[19px] font-600 text-[#CBD5E1]">Plan Details</p>
          <p className="ml-5 mt-1">{profileData.plan}</p>
        </div>
        <hr className="text-[#CBD5E1] mt-5" />
        <div className="flex justify-center mt-15">
          <button
            className="bg-[#E50914] h-[40px] w-[70px] text-center rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-[#000000] h-80 w-full py-6 mt-auto border-t">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-4 text-gray-600">
            <a href="https://www.google.com" target="_blank" className="hover:text-blue-600 transition">
              <i className="fab fa-google"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" className="hover:text-red-600">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <p className="text-gray-500 text-[15px]">Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
