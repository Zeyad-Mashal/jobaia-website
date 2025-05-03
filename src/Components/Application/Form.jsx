import React, { useState } from "react";
import "./Form.css"; // استيراد ملف الـ CSS
import { MdDone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
const Form = () => {
  const { userId, jobId } = useParams();

  const token = localStorage.getItem("token");
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDZkZjE0NTQ4MjQ2MTNlNmI5N2I5ZiIsImlhdCI6MTc0NTM0ODkzNH0.Eg9yqTlJp21vsOosiYK_RQNJmOZ-VR6PlzWvsRobLeA"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [optionalAddress, setOptionalAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [otherJob, setOtherJob] = useState("");
  const [position, setPosition] = useState("");
  const [WorkingPeriod, setWorkingPeriod] = useState("");
  const [workedUs, setWorkedUs] = useState("");
  const [workedUsWhen_month, setworkedUsWhen_month] = useState("");
  const [workedUsWhen_day, setworkedUsWhen_day] = useState("");
  const [workedUsWhen_year, setworkedUsWhen_year] = useState("");
  const [cv, setcv] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      mandatoryAddress: address,
      optionalAddress: optionalAddress,
      city,
      state,
      zipCode,
      phoneNabmer: phone,
      alternateNumber: alternatePhone,
      jobNeeded: position,
      otherJob,
      WorkingPeriod: WorkingPeriod,
      workedUs,
      workedUsWhen_month,
      workedUsWhen_day,
      workedUsWhen_year,
      CV: cv,
    };

    try {
      const res = await fetch(
        `https://jobaia-green.vercel.app/application/${userId}/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify(payload), // ✅ إصلاح رئيسي هنا
        }
      );

      const text = await res.text(); // نقرأ النص الخام أولاً
      console.log(text);

      try {
        const data = JSON.parse(text); // نحاول نحوله لـ JSON

        if (res.status === 201) {
          console.log("تم إرسال البيانات بنجاح:", data);
          setIsSubmitted(true);
        } else {
          alert("فشل الإرسال: " + (data.message || "حدث خطأ غير معروف"));
        }
      } catch (jsonErr) {
        console.error("الرد من السيرفر ليس بصيغة JSON:", text);
        alert("السيرفر أرجع رد غير متوقع.");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الإرسال:", error);
      alert("حدث خطأ أثناء الاتصال بالسيرفر.");
    }
  };

  return (
    <div className="app">
      <div className="App_container">
        <h2>Job Seekers App</h2>
        {isSubmitted ? (
          <div className="success-message">
            <MdDone />
            <h2>Form submitted successfully!</h2>
            <button>
              <Link to={`/feedback/${userId}/${jobId}`}>Go To FeedBack</Link>
            </button>
          </div>
        ) : (
          <div className="w-full p-4">
            {/* حقل الاسم */}
            <label>
              Name<span className="required">*</span>
            </label>
            <div id="className" className="form-group">
              <input
                className="Names"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="Names"
                type="text"
                name="lastName: lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* حقل العنوان */}
            <div className="form-group">
              <label>
                Address<span className="required">*</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <div className="row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State / Province"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                name="zipCode"
                className="zipCode"
                placeholder="ZipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            {/*Phone Number*/}
            <div className="form-group">
              <label>
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="(111) 111-1111"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            {/*Phone Number(2)*/}
            <div className="form-group">
              <label>Alternate Number</label>
              <input
                type="text"
                name="alternatePhone"
                placeholder="(111) 111-1111"
                value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
              />
            </div>

            {/* الوظيفة المتقدم لها */}
            <div className="form-group">
              <label>
                Position for which you are applying?{" "}
                <span className="required">*</span>
              </label>
              <select
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="ahmed">Select a position1</option>
                <option value="Sales Associate">Select a position2</option>
                <option value="Manager">Select a position3</option>
                <option value="Developer">Select a position4</option>
              </select>
            </div>

            <div className="form-group">
              <label>If other , kindly specify</label>
              <input
                type="text"
                name="otherJob"
                placeholder="Front End"
                value={otherJob}
                onChange={(e) => setOtherJob(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>
                Preferred Working mode <span className="required">*</span>
              </label>
              <select
                name="WorkingPeriod"
                value={WorkingPeriod}
                onChange={(e) => setWorkingPeriod(e.target.value)}
              >
                <option value="1">Full-Time</option>
                <option value="2">part-Time</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Have you previously worked us?{" "}
                <span className="required">*</span>
              </label>
              <select
                name="workedUs"
                value={workedUs}
                onChange={(e) => setWorkedUs(e.target.value)}
              >
                <option value="1">yes</option>
                <option value="2">no</option>
              </select>
            </div>
            <label>
              If so , When? <span className="required">*</span>
            </label>
            <div className="Date">
              <select
                name="workedUsWhen_month"
                value={workedUsWhen_month}
                onChange={(e) => setworkedUsWhen_month(e.target.value)}
              >
                <option value="Manager">January</option>
              </select>
              <select
                name="workedUsWhen_year"
                value={workedUsWhen_year}
                onChange={(e) => setworkedUsWhen_year(e.target.value)}
              >
                <option value="Manager">2025</option>
              </select>
              <select
                name="workedUsWhen_day"
                value={workedUsWhen_day}
                onChange={(e) => setworkedUsWhen_day(e.target.value)}
              >
                <option value="Manager">1</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Paste Your CV Link <span className="required">*</span>
              </label>
              <input
                type="text"
                name="cv"
                placeholder="https://drive.google.com/..."
                value={cv}
                onChange={(e) => setcv(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
