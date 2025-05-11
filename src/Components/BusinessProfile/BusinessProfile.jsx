import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Controller from "../Controller/Controller";
// Reusable editable input field component
const EditableField = ({ label, placeholder, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value || "");

  const handleBlur = () => {
    setEditing(false);
    onChange(localValue);
  };

  return (
    <div className="mb-2">
      {editing ? (
        <input
          className="form-input w-full border rounded px-3 py-2"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => setEditing(true)}
        >
          {value ? value : `+ ${label}`}
        </span>
      )}
    </div>
  );
};

// Skills component with creatable and selectable tags
const EditableTags = ({
  title,
  label,
  placeholder,
  selectedOptions,
  setSelectedOptions,
}) => {
  // Default skill options
  const initialOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "SQL", label: "SQL" },
    { value: "AWS", label: "AWS" },
  ];

  const [options, setOptions] = useState(initialOptions);
  const [isOpen, setIsOpen] = useState(false);

  // Handle selection from dropdown
  const handleSelectChange = (selected) => {
    if (selected) {
      const newlySelected = selected[selected.length - 1];
      if (
        newlySelected &&
        !selectedOptions.some((opt) => opt.value === newlySelected.value)
      ) {
        setSelectedOptions([...selectedOptions, newlySelected]);
      }
    }
    setIsOpen(false);
  };

  // Handle creating new tag
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSelectedOptions([...selectedOptions, newOption]);
    setOptions([...options, newOption]);
    setIsOpen(false);
  };

  // Handle deleting a tag
  const handleDelete = (valueToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((item) => item.value !== valueToRemove)
    );
  };

  // Filter out already selected options
  const availableOptions = options.filter(
    (opt) => !selectedOptions.some((sel) => sel.value === opt.value)
  );

  return (
    <div className="bg-white shadow rounded p-5 mb-6">
      <h5 className="text-lg font-semibold mb-4">{title}</h5>

      {/* Display selected tags */}
      <div className="flex flex-wrap gap-2 mb-2 min-h-12">
        {selectedOptions.map((item) => (
          <div
            key={item.value}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
          >
            <span className="mr-2">{item.label}</span>
            <button
              type="button"
              onClick={() => handleDelete(item.value)}
              className="text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Tag input dropdown */}
      <div className="relative">
        <button
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          + Add {label}
        </button>

        {isOpen && (
          <div className="mt-2 w-full z-10">
            <CreatableSelect
              options={availableOptions}
              isMulti
              autoFocus
              onChange={handleSelectChange}
              onCreateOption={handleCreate}
              placeholder={placeholder}
              value={[]}
              className="basic-multi-select"
              classNamePrefix="select"
              formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              noOptionsMessage={() => "Type to add new skill"}
              menuIsOpen={true}
              onBlur={() => setIsOpen(false)}
              controlShouldRenderValue={false}
              menuPlacement="bottom"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable editable list component
const EditableList = ({ title, label, placeholder, items, setItems }) => {
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Add new item to list
  const handleAdd = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
      setShowInput(false);
    }
  };

  // Remove item from list
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Control how many items to show
  const displayedItems = showAll ? items : items.slice(0, 3);

  return (
    <div className="bg-white shadow rounded p-5 mb-6">
      <h5 className="text-lg font-semibold mb-4">{title}</h5>
      <ul className="space-y-2 mb-4">
        {displayedItems.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-2 rounded"
          >
            {item}
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      {/* Show more/less toggle */}
      {items.length > 3 && (
        <div className="text-center mb-4">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Input for adding new items */}
      {showInput ? (
        <div className="flex gap-2">
          <input
            className="form-input flex-1 border rounded px-3 py-2"
            placeholder={placeholder}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white rounded px-4"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      ) : (
        <button
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
          onClick={() => setShowInput(true)}
        >
          + Add {label}
        </button>
      )}
    </div>
  );
};

// Main Business Profile Component
const BProfilePage = () => {
  const userName = localStorage.getItem("userName");
  // State for all profile fields
  const [companyName, setCompanyName] = useState(
    userName ? userName : "Company Name"
  );
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [about, setAbout] = useState("");
  const [jobTitles, setJobTitles] = useState("");
  const [jobCategories, setJobCategories] = useState("");
  const [jobTypes, setJobTypes] = useState("");
  const [skills, setSkills] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [services, setServices] = useState([]);

  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("businessProfileData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        // Update all fields with saved data
        setCompanyName(parsedData.companyName || "Tech Solutions Inc.");
        setIndustry(parsedData.industry || "");
        setLocation(parsedData.location || "");
        setPhone(parsedData.phone || "");
        setWebsite(parsedData.website || "");
        setFoundedYear(parsedData.foundedYear || "");
        setCompanySize(parsedData.companySize || "");
        setAbout(parsedData.about || "");
        setJobTitles(parsedData.jobTitles || "");
        setJobCategories(parsedData.jobCategories || "");
        setJobTypes(parsedData.jobTypes || "");
        setSkills(parsedData.skills || []);
        setCompanyInfo(parsedData.companyInfo || []);
        setServices(parsedData.services || []);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }, []);

  // Generate initials for avatar
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return name[0]?.toUpperCase() || "";
  };

  const initials = getInitials(companyName);

  // Save all profile data to localStorage
  const handleSave = () => {
    const profileData = {
      companyName,
      industry,
      location,
      phone,
      website,
      foundedYear,
      companySize,
      about,
      jobTitles,
      jobCategories,
      jobTypes,
      skills,
      companyInfo,
      services,
    };

    try {
      // Stringify and save to localStorage
      localStorage.setItem("businessProfileData", JSON.stringify(profileData));
      alert("Company profile saved successfully!");
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const userId = localStorage.getItem("user");

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Navigation tabs */}
      <Controller userId={userId} />

      {/* Main profile card */}
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded mb-8">
        <div className="flex items-center gap-4 mb-6">
          {/* Company avatar with initials */}
          <div className="bg-blue-600 text-white flex items-center justify-center rounded-full w-24 h-24 text-2xl">
            {initials}
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">{companyName}</h4>
            <EditableField
              label="Add your industry"
              placeholder="Enter your industry"
              value={industry}
              onChange={setIndustry}
            />
            <EditableField
              label="Add your location"
              placeholder="Enter your location"
              value={location}
              onChange={setLocation}
            />
          </div>
        </div>

        {/* Contact information section */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-3">Contact Info</h5>
          <div className="flex items-center mb-2">
            <span className="mr-2">📞</span>
            <EditableField
              label="Add your phone"
              placeholder="Enter your phone"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">🌐</span>
            <EditableField
              label="Add your website"
              placeholder="Enter your website URL"
              value={website}
              onChange={setWebsite}
            />
          </div>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          )}
        </div>

        {/* General company information */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-3">General Info</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Founded Year:</strong>{" "}
              <EditableField
                label="Add founded year"
                placeholder="Enter founded year"
                value={foundedYear}
                onChange={setFoundedYear}
              />
            </div>
            <div>
              <strong>Company Size:</strong>{" "}
              <EditableField
                label="Add company size"
                placeholder="Enter company size"
                value={companySize}
                onChange={setCompanySize}
              />
            </div>
          </div>
          <div className="mt-4">
            <strong>About Company:</strong>
            <EditableField
              label="Add about company"
              placeholder="Enter company description"
              value={about}
              onChange={setAbout}
            />
          </div>
        </div>

        {/* Hiring preferences section */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Hiring Preferences</h5>
          <EditableField
            label="Job Titles and Keywords"
            placeholder="Enter job titles or keywords"
            value={jobTitles}
            onChange={setJobTitles}
          />
          <EditableField
            label="Job Categories"
            placeholder="Enter job categories"
            value={jobCategories}
            onChange={setJobCategories}
          />
          <EditableField
            label="Job Types"
            placeholder="Enter job types"
            value={jobTypes}
            onChange={setJobTypes}
          />
        </div>
      </div>

      {/* Additional sections for skills, company info, and services */}
      <div className="max-w-3xl mx-auto">
        <EditableTags
          title="Technical Skills Needed"
          label="Skill"
          placeholder="Enter a new skill"
          selectedOptions={skills}
          setSelectedOptions={setSkills}
        />
        <EditableList
          title="Company Information"
          label="Company Info"
          placeholder="Enter company information"
          items={companyInfo}
          setItems={setCompanyInfo}
        />
        <EditableList
          title="Services Offered"
          label="Service"
          placeholder="Enter service"
          items={services}
          setItems={setServices}
        />
      </div>

      {/* Save button */}
      <div className="max-w-3xl mx-auto text-right">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={handleSave}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default BProfilePage;
