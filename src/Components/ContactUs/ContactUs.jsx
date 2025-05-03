import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-[#005691]");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\d*$/.test(value)) return; // Allow only numbers
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.message
    ) {
      alert("Please fill all fields");
      return;
    }
    setShowPopup(true);
    setButtonColor("bg-green-600");
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    setTimeout(() => {
      setButtonColor("bg-[#005691]");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        message: "",
      });
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-10 relative">
      {/* Title */}
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <IoCheckmarkCircleOutline className="text-green-500 text-6xl mb-2" />
            <p className="text-gray-800 text-lg font-semibold">
              Your massege has been sent successfully!
            </p>
          </div>
        </div>
      )}

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Form Section */}
        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-xl flex flex-col justify-between min-h-[600px]">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Send a Message
          </h3>
          <form className="space-y-6 flex-grow" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-blue-600 text-sm">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border p-4 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="text-blue-600 text-sm">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border p-4 rounded w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-blue-600 text-sm">Email</label>
                <input
                  placeholder="name@gmail.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-4 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="text-blue-600 text-sm">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="border p-4 rounded w-full"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-blue-600 text-sm">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border p-4 rounded w-full h-40"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`${buttonColor} text-white px-6 py-3 rounded text-lg hover:opacity-80 transition block mx-auto shadow-md`}
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Info & Map Section */}
        <div className="flex flex-col gap-6">
          {/* Contact Info */}
          <div className="bg-[#005691] text-white p-10 rounded-lg shadow-xl flex flex-col min-h-[300px] justify-between">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 p-3 rounded-full">
                <FaMapMarkerAlt className="text-white text-lg" />
              </span>{" "}
              Alexandria, Egypt
            </p>
            <p className="flex items-center gap-3 mb-4">
              <span className="bg-blue-500 p-3 rounded-full">
                <FaEnvelope className="text-white text-lg" />
              </span>{" "}
              name@gmail.com
            </p>
            <p className="flex items-center gap-3 mb-8">
              <span className="bg-blue-500 p-3 rounded-full">
                <FaPhone className="text-white text-lg" />
              </span>{" "}
              +201234567890
            </p>
            <div className="flex space-x-6 text-3xl">
              <FaFacebook className="cursor-pointer text-white hover:text-blue-600 transition" />
              <FaTwitter className="cursor-pointer text-white hover:text-sky-400 transition" />
              <FaLinkedin className="cursor-pointer text-white hover:text-blue-800 transition" />
              <FaInstagram className="cursor-pointer text-white hover:text-pink-500 transition" />
            </div>
          </div>
          {/* Map Section */}
          <div className="overflow-hidden rounded-lg shadow-xl">
            <iframe
              className="w-full h-60"
              src="https://www.google.com/maps/embed?..."
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
