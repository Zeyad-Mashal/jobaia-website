import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { LogIn, Pointer } from "lucide-react";
const Header = () => {
  const token = localStorage.getItem("token");
  const [logedIn, setLogedIn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const userName = localStorage.getItem("userName");

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("businessProfileData");
    localStorage.removeItem("profileData");
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <Navbar fluid rounded className=" z-50 w-full bg-white shadow-md">
      <Navbar.Brand href="/">
        <img
          src={logo}
          className="mr-3 h-6 sm:h-10"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2 list-none">
        {token ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Welcom</span>
              <span className="block truncate text-sm font-medium">
                {userName}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              {role == "Basic" ? (
                <Link to={"/user_profile"}>Profile</Link>
              ) : (
                <Link to={"/business-profile"}>Profile</Link>
              )}
            </Dropdown.Item>
            <Dropdown.Divider />
            {/* <Dropdown.Item onClick={localStorage.removeItem("token")}>
              Sign out
            </Dropdown.Item> */}
            <p
              className="logout"
              onClick={logOut}
              style={{
                cursor: "pointer ",
                textAlign: "center",
                fontSize: "14px",
                padding: "10px 0",
              }}
            >
              LogOut
            </p>
          </Dropdown>
        ) : (
          <Link to="/auth" className="btn btn-primary">
            Login
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/jobs">Our Jobs</Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
