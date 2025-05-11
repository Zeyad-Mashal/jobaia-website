import React, { useEffect, useState } from "react";
import Controller from "../Controller/Controller";
import "./Feedbacks.css";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const userId = localStorage.getItem("user");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError("");
      // Simulate API call
      const response = await fetch(
        `https://jobaia-green.vercel.app/feedback/${userId}`
      );
      const data = await response.json();
      setFeedbacks(data.OneFeedback);
    } catch (err) {
      setError("Error fetching feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
  };

  return (
    <div className="feedbacks-page">
      {/* Controller */}
      <Controller userId={userId} />

      <header className="feedbacks-header">
        <h1>Feedbacks</h1>
      </header>

      {/* Feedback Cards */}
      <section className="feedbacks-container">
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedbacks found</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb._id} className="feedback-card">
              <h3>{fb.createdBy.CompanyName}</h3>
              <p>
                <strong>Rating:</strong> {fb.rating}/5
              </p>
              <p>
                <strong>Comment:</strong>{" "}
                {fb.comment.length > 30
                  ? fb.comment.slice(0, 30) + "..."
                  : fb.comment}
              </p>
              <button
                className="show-more-btn"
                onClick={() => handleShowMore(fb)}
              >
                Show More
              </button>
            </div>
          ))
        )}
      </section>

      {/* Modal */}
      {selectedFeedback && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <button className="close-modal-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>Feedback Details</h2>
            <p>
              <strong>Company:</strong> {selectedFeedback.createdBy.CompanyName}
            </p>
            <p>
              <strong>Email:</strong> {selectedFeedback.createdBy.email}
            </p>
            <p>
              <strong>Rating:</strong> {selectedFeedback.rating}/5
            </p>
            <p>
              <strong>Comment:</strong> {selectedFeedback.comment}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedFeedback.createdAt).toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AllFeedbacks;
