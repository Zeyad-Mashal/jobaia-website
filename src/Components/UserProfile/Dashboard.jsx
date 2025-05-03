import React, { useState } from "react";
import ProfilePage from "./ProfilePage";

const Dashboard = () => {
  const [key, setKey] = useState("profile");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const applications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "ABC Tech",
      location: "Cairo, Egypt",
      date: "2025-04-25",
      description:
        "We are looking for a skilled frontend developer to join our team.",
      salary: "15,000 EGP",
      contractType: "Full-time",
      jobType: "Onsite",
      workHours: "9 AM - 5 PM",
      requirements: [
        "3+ years experience",
        "React.js proficiency",
        "Strong CSS skills",
      ],
      benefits: ["Health insurance", "Remote work options", "Annual bonus"],
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "XYZ Solutions",
      location: "Giza, Egypt",
      date: "2025-04-20",
      description: "Backend developer with Node.js and MongoDB experience.",
      salary: "18,000 EGP",
      contractType: "Full-time",
      jobType: "Hybrid",
      workHours: "Flexible hours",
      requirements: [
        "2+ years Node.js",
        "Experience with MongoDB",
        "REST APIs knowledge",
      ],
      benefits: ["Flexible hours", "Gym membership", "Performance bonus"],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Minds",
      location: "Remote",
      date: "2025-04-18",
      description: "Creative UI/UX designer needed for mobile and web apps.",
      salary: "12,000 EGP",
      contractType: "Freelance",
      jobType: "Remote",
      workHours: "Project-based",
      requirements: [
        "Portfolio required",
        "Figma & Adobe XD skills",
        "Good communication",
      ],
      benefits: ["Remote work", "Project bonuses", "Training sessions"],
    },
  ];

  const handleSelect = (tab) => {
    setKey(tab);
  };

  const handleView = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedApp(null);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      {/* Tabs */}
      <div className="border-b border-gray-300 mb-8">
        <nav className="-mb-px flex justify-center" role="tablist">
          <button
            onClick={() => handleSelect("profile")}
            className={`w-1/2 py-4 text-center font-medium ${
              key === "profile"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleSelect("applications")}
            className={`w-1/2 py-4 text-center font-medium ${
              key === "applications"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Applications
          </button>
        </nav>
      </div>

      {/* Content */}
      {key === "profile" && <ProfilePage />}

      {key === "applications" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{app.title}</h3>
              <p className="text-gray-600">{app.company}</p>
              <p className="text-gray-500 text-sm">{app.location}</p>
              <p className="text-gray-400 text-xs mb-4">
                Applied on: {new Date(app.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleView(app)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedApp.title}</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Company:</strong> {selectedApp.company}
              </p>
              <p>
                <strong>Location:</strong> {selectedApp.location}
              </p>
              <p>
                <strong>Salary:</strong> {selectedApp.salary}
              </p>
              <p>
                <strong>Contract Type:</strong> {selectedApp.contractType}
              </p>
              <p>
                <strong>Job Type:</strong> {selectedApp.jobType}
              </p>
              <p>
                <strong>Work Hours:</strong> {selectedApp.workHours}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(selectedApp.date).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Description:</h3>
                <p>{selectedApp.description}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">Requirements:</h3>
                <ul className="list-disc list-inside">
                  {selectedApp.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">Benefits:</h3>
                <ul className="list-disc list-inside">
                  {selectedApp.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
