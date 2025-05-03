import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import "./LatestJobs.css";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jobaia-green.vercel.app/newestJobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);
  return (
    <section className="py-5">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900">
          Latest Jobs
        </h2>

        <div className="flex flex-wrap justify-center gap-y-5 gap-x-5">
          {loading ? (
            <div className="loading_api">
              <span class="loaderApi"></span>
            </div>
          ) : (
            jobs.map((item, index) => {
              return (
                <Card href="#" className="w-full md:w-72">
                  <h5 className="text-2xl font-bold  text-gray-900 ">
                    {item.CompanyName}-{item.jobTitle}
                  </h5>
                  <p className="font-bold">
                    Type: <span className="font-normal">{item.jobType}</span>
                  </p>
                  <p className="font-bold">
                    Location:{" "}
                    <span className="font-normal">
                      {item.country}, {item.city}, {item.area}
                    </span>
                  </p>
                  <p className="font-bold">
                    Salary:{" "}
                    <span className="font-normal">{item.salary} EGP</span>
                  </p>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
