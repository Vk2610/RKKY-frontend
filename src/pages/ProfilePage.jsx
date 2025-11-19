import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "../components/ui/button";
import { MdEdit } from "react-icons/md";
import {
  BRANCHES,
  DESIGNATIONS,
  REGION,
  BRANCH_TYPE,
  QUALIFICATIONS,
} from "../utils/branches";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setProfileData } from "../local_data/form_data";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [editFields, setEditFields] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomQualification, setShowCustomQualification] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      console.log("function called");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("User not logged in.");
          return;
        }

        const decoded = jwtDecode(token);
        console.log(token);

        const response = await axios.get(
          `http://localhost:3000/profile/${decoded.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);

        setUser(response.data.result || {});
        console.log("User profile data:", response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please log in again.");
        } else {
          toast.error("Failed to load user details.");
        }
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const toggleEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleKeyPress = (e, field) => {
    if (e.key === "Enter") toggleEdit(field);
  };

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : date;
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not logged in.");
        return;
      }

      const decoded = jwtDecode(token);
      const formattedUser = { ...user };

      // Format all date fields
      const dateFields = [
        "branchJoiningDate",
        "currentAppointmentDate",
        "firstAppointmentDate",
        "firstJoiningDate",
        "retirementDate",
      ];

      dateFields.forEach((field) => {
        if (formattedUser[field]) {
          formattedUser[field] = formatDate(formattedUser[field]);
        }
      });

      const response = await axios.put(
        `http://localhost:3000/profile/${decoded.id}`,
        formattedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setProfileData(formattedUser);
        setEditFields({});
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  const ProfileField = ({ label, field, type = "text" }) => (
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <label className="text-gray-700 font-semibold w-1/5">{label}:</label>
      <div className="w-3/5 flex items-center">
        {editFields[field] ? (
          <input
            type={type}
            value={
              type === "date" ? formatDate(user[field]) : user[field] || ""
            }
            onChange={(e) => handleChange(field, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, field)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            autoFocus
          />
        ) : (
          <span className="px-4 py-2">
            {type === "date" ? formatDate(user[field]) : user[field] || "-"}
          </span>
        )}
      </div>
      <Button
        onClick={() => toggleEdit(field)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1 px-3"
        size="sm"
      >
        {editFields[field] ? "Done" : <MdEdit />}
      </Button>
    </div>
  );

  const DropdownField = ({ label, field, options }) => (
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <label className="text-gray-700 font-semibold w-1/5">{label}:</label>
      <div className="w-3/5 flex items-center">
        {editFields[field] ? (
          <select
            value={user[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, field)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <span className="px-4 py-2">{user[field] || "-"}</span>
        )}
      </div>
      <Button
        onClick={() => toggleEdit(field)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1 px-3"
        size="sm"
      >
        {editFields[field] ? "Done" : <MdEdit />}
      </Button>
    </div>
  );

  const SearchableDropdown = ({ label, field, options }) => (
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <label className="text-gray-700 font-semibold w-1/5">{label}:</label>
      <div className="w-3/5 flex items-center">
        {editFields[field] ? (
          <div className="relative w-full">
            <input
              type="text"
              placeholder={`Search or Select ${label}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, field)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            {searchTerm && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                {options
                  .filter((opt) =>
                    opt.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        handleChange(field, opt);
                        setSearchTerm("");
                        toggleEdit(field);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {opt}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ) : (
          <span className="px-4 py-2">{user[field] || "-"}</span>
        )}
      </div>
      <Button
        onClick={() => toggleEdit(field)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1 px-3"
        size="sm"
      >
        {editFields[field] ? "Done" : <MdEdit />}
      </Button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 border border-gray-300 shadow-md bg-white">
      <h2 className="text-3xl font-semibold mb-6">User Profile</h2>

      <div className="space-y-2">
        <ProfileField label="HRMS NO" field="hrmsNo" />
        <ProfileField label="Name" field="employeeName" />
        <ProfileField label="Email ID" field="emailId" type="email" />

        <DropdownField
          label="Gender"
          field="gender"
          options={["Male", "Female", "Other"]}
        />

        <ProfileField label="Mobile" field="mobileNo" />

        <SearchableDropdown
          label="Branch Name"
          field="branchName"
          options={BRANCHES}
        />
        <SearchableDropdown
          label="Branch Region"
          field="branchRegionName"
          options={REGION}
        />
        <SearchableDropdown
          label="Designation"
          field="designation"
          options={DESIGNATIONS}
        />
        <SearchableDropdown
          label="Branch Type"
          field="branchType"
          options={BRANCH_TYPE}
        />

        {/* Qualifications with custom input */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <label className="text-gray-700 font-semibold w-1/5">
            Qualifications:
          </label>
          <div className="w-3/5 flex items-center">
            {editFields["qualifications"] ? (
              <>
                <select
                  value={
                    qualifications.includes(user.qualifications)
                      ? user.qualifications
                      : "Other"
                  }
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setShowCustomQualification(true);
                      handleChange("qualifications", "");
                    } else {
                      setShowCustomQualification(false);
                      handleChange("qualifications", e.target.value);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="">Select Qualification</option>
                  {qualifications.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {showCustomQualification && (
                  <input
                    type="text"
                    placeholder="Enter custom qualification"
                    value={
                      !qualifications.includes(user.qualifications)
                        ? user.qualifications
                        : ""
                    }
                    onChange={(e) =>
                      handleChange("qualifications", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
                  />
                )}
              </>
            ) : (
              <span className="px-4 py-2">{user.qualifications || "-"}</span>
            )}
          </div>
          <Button
            onClick={() => toggleEdit("qualifications")}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1 px-3"
            size="sm"
          >
            {editFields["qualifications"] ? "Done" : <MdEdit />}
          </Button>
        </div>

        <DropdownField
          label="Profile Type"
          field="profileType"
          options={["Teaching", "Non-Teaching"]}
        />
        <DropdownField
          label="Marital Status"
          field="Marital_status"
          options={["Single", "Married", "Widowed", "Divorced"]}
        />

        <ProfileField label="PAN No" field="PAN_no" />
        <ProfileField label="Present Address" field="Present_Address" />
        <ProfileField label="Permanent Address" field="Permanent_Address" />

        {/* Checkbox to copy address */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sameAsPresent"
            onChange={(e) => {
              if (e.target.checked) {
                handleChange("Permanent_Address", user["Present_Address"]);
              }
            }}
            className="mr-2"
          />
          <label htmlFor="sameAsPresent" className="text-gray-700">
            Same as Present Address
          </label>
        </div>

        <ProfileField
          label="Branch Joining Date"
          field="branchJoiningDate"
          type="date"
        />
        <ProfileField
          label="Current Appointment Date"
          field="currentAppointmentDate"
          type="date"
        />

        <DropdownField
          label="Current Appointment Type"
          field="CurrentAppointmentType"
          options={["Permanent", "Temporary", "Probation"]}
        />

        <ProfileField
          label="First Appointment Date"
          field="firstAppointmentDate"
          type="date"
        />
        <ProfileField
          label="First Joining Date"
          field="firstJoiningDate"
          type="date"
        />

        <DropdownField
          label="First Appointment Type"
          field="FirstAppointmentType"
          options={["Permanent", "Temporary", "Probation"]}
        />
        <DropdownField
          label="Employee Type"
          field="EmployeeType"
          options={["Granted", "Non-Granted"]}
        />

        <ProfileField label="Approval Ref No" field="Approval_Ref_No" />
        <ProfileField
          label="Approval Letter Date"
          field="Approval_letter_date"
          type="date"
        />
        <ProfileField
          label="Retirement Date"
          field="retirementDate"
          type="date"
        />

        <DropdownField
          label="Appointment Nature"
          field="Appointment_Nature"
          options={["Full-time", "Part-time"]}
        />
      </div>

      <Button
        className="mt-6 bg-green-600 text-white hover:bg-green-700"
        onClick={handleUpdate}
      >
        Save All Changes
      </Button>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;