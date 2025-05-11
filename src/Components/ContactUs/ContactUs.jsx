import React, { useState, useEffect } from "react";
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
    FirstName: "",
    LastName: "",
    Email: "",
    Mobile: "",
    Message: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-[#005691]");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState(null);

  // Fetch contact data on component mount
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(
          "https://jobaia-green.vercel.app/ContactUs"
        );
        if (response.status === 200) {
          const data = await response.json();
          setContactData(data);
        } else if (response.status === 500) {
          console.error("Server error while fetching contact data");
        }
      } catch (err) {
        console.error("Error fetching contact data:", err);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Mobile" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    const isEmpty = ["FirstName", "LastName", "Email", "Message"].some(
      (key) => formData[key].trim() === ""
    );
    if (isEmpty) {
      setError("Please fill all required fields");
      setIsLoading(false);
      return;
    }

    // Remove Mobile from payload and ensure correct field names
    const { Mobile, ...payloadData } = formData;
    const payload = {
      FirtsName: payloadData.FirstName.trim(),
      LastName: payloadData.LastName.trim(),
      Email: payloadData.Email.trim(),
      Message: payloadData.Message.trim(),
      CreatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://jobaia-green.vercel.app/ContactUs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        responseData = null;
      }

      if (response.status === 201) {
        setShowPopup(true);
        setError("");
        setButtonColor("bg-green-600");

        setTimeout(() => {
          setShowPopup(false);
          setButtonColor("bg-[#005691]");
          setFormData({
            FirstName: "",
            LastName: "",
            Email: "",
            Mobile: "",
            Message: "",
          });
        }, 3000);
      } else if (response.status === 500) {
        const errorMessage = responseData?.errorResponse?.errmsg?.includes(
          "duplicate key error"
        )
          ? "This email address is already registered. Please use a different email address."
          : "An error occurred while sending your message. Please try again.";

        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      setError(
        "Network error. Please check your internet connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-10 relative">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <IoCheckmarkCircleOutline className="text-green-500 text-6xl mb-2" />
            <p className="text-gray-800 text-lg font-semibold">
              Your message has been sent successfully!
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full max-w-6xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

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
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className="border p-4 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="text-blue-600 text-sm">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
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
                  type="email"
                  name="Email"
                  placeholder="name@gmail.com"
                  value={formData.Email}
                  onChange={handleChange}
                  className="border p-4 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="text-blue-600 text-sm">Mobile</label>
                <input
                  type="tel"
                  name="Mobile"
                  value={formData.Mobile}
                  onChange={handleChange}
                  className="border p-4 rounded w-full"
                />
              </div>
            </div>
            <div>
              <label className="text-blue-600 text-sm">Message</label>
              <textarea
                name="Message"
                value={formData.Message}
                onChange={handleChange}
                className="border p-4 rounded w-full h-40"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${buttonColor} text-white px-6 py-3 rounded text-lg hover:opacity-80 transition block mx-auto shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        {/* Contact Info & Map Section */}
        <div className="flex flex-col gap-6">
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
