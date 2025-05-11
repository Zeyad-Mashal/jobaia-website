import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const { userId, jobId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    feedback: false,
    rating: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      feedback: feedback.trim() === "",
      rating: rating === 0,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    try {
      const response = await fetch(
        `https://jobaia-green.vercel.app/feedback/${userId}/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: feedback, rating }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true);
        setFeedback("");
        setRating(0);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
        setTimeout(() => {
          navigate("/");
        }, 3500);
      } else {
        alert(data.message || "Failed to submit feedback");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <IoCheckmarkCircleOutline className="text-green-500 text-6xl mb-2" />
            <p className="text-gray-800 text-lg font-semibold">
              Your feedback has been sent successfully!
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl min-h-[60vh] p-6 bg-white shadow-xl rounded-2xl flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-semibold text-lg mb-2">
            Describe Your Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full p-4 border ${
              errors.feedback ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          {/* Star Rating */}
          <div className="mt-6 text-center">
            <p className="text-gray-700 font-semibold text-lg mb-3">Rate Us</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={32}
                  className={`cursor-pointer ${
                    star <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-2">
                Please select a rating
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
