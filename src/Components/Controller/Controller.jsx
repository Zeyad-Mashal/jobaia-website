import { NavLink } from "react-router-dom";
import "./Controller.css";
const Controller = ({ userId }) => {
  const linkClass = ({ isActive }) =>
    isActive ? "controller-btn active" : "controller-btn"; // خلي active هنا

  return (
    <div className="controller">
      <div className="flex justify-content-center align-items-center text-center gap-4 p-4 bg-white shadow-md rounded-md w-fit">
        <NavLink to="/business-profile" className={linkClass}>
          General Info
        </NavLink>

        <NavLink to="/getAllFeedbacks" className={linkClass}>
          Feedback
        </NavLink>

        <NavLink to={`/create_job/${userId}`} className={linkClass}>
          Post Jobs
        </NavLink>

        <NavLink to="/business-jobs" className={linkClass}>
          All Jobs
        </NavLink>
      </div>
    </div>
  );
};

export default Controller;
