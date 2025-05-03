import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image1 from "../../assets/images/person.jpg";
import image2 from "../../assets/images/person22.jpg";

const Career = () => {
  const navigate = useNavigate();

  const handleCareer = async (jobTitle) => {
    try {
      const api = `https://jobaia-green.vercel.app/filter?jobTitle=${jobTitle}`;
      const response = await axios.get(api);
      console.log(response.data.data);
      const jobs = response.data.data;
      localStorage.setItem("filterKey", jobTitle);
      navigate(`/jobs`);
    } catch (error) {
      if (error.response.status === 404) {
        console.log("error");
      }
    }
  };

  return (
    <section className="py-1">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900">
          Browse Jobs by Career Level
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div
            className="relative w-56 group cursor-pointer"
            onClick={() => handleCareer("Full Stack")}
          >
            <img
              className="brightness-75 w-full h-72 object-cover rounded-md transition-all group-hover:shadow-2xl"
              src={image1}
              alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 text-white text-center py-2">
              Full Stack
            </div>
          </div>

          <div
            className="relative w-56 group cursor-pointer"
            onClick={() => handleCareer("Back end")}
          >
            <img
              className="brightness-75 w-full h-72 object-cover rounded-md transition-all group-hover:shadow-2xl"
              src={image2}
              alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 text-white text-center py-2">
              Backend
            </div>
          </div>

          <div
            className="relative w-56 group cursor-pointer"
            onClick={() => handleCareer("front end")}
          >
            <img
              className="brightness-75 w-full h-72 object-cover rounded-md transition-all group-hover:shadow-2xl"
              src={image1}
              alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 text-white text-center py-2">
              Frontend
            </div>
          </div>

          <div
            className="relative w-56 group cursor-pointer"
            onClick={() => handleCareer("Mashaal")}
          >
            <img
              className="brightness-75 w-full h-72 object-cover rounded-md transition-all group-hover:shadow-2xl"
              src={image2}
              alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 text-white text-center py-2">
              Mashaal
            </div>
          </div>

          <div
            className="relative w-56 group cursor-pointer"
            onClick={() => handleCareer("Software Developer")}
          >
            <img
              className="brightness-75 w-full h-72 object-cover rounded-md transition-all group-hover:shadow-2xl"
              src={image1}
              alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 text-white text-center py-2">
              Software Developer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
