import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaSchool,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaUserTag,
} from "react-icons/fa";
import bgImg from "../assets/rayat-img.jpg";
import CustomInput from "../components/CustomInput";
import AuthButton from "../components/AuthButton";
import { BRANCHES, REGION } from "../constants/branches";
import SearchDropDown from "../components/SearchDropDown";
import profileDataContext from "../contexts/profileDataContext";

function RegisterPage() {
  const [formData, setFormData] = useState({
    hrmsNo: "",
    email: "",
    branchName: "",
    region: "",
    mobileNo: "",
    password: "",
    role: "user",
  });

  const { profileData, setProfileData } = useContext(profileDataContext);

  console.log("Profile Data in Register Page:", profileData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchDropdownChange = (formKey, value) => {
    setFormData({ ...formData, [formKey]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register form submitted", formData);
  };

  return (
    <div
      className="p-10 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-95 p-8 rounded-[25px] shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>

        <form className="space-y-6" onSubmit={handleRegister}>
          <CustomInput
            id="HRMS_No"
            name="HRMS_No"
            label="HRMS No"
            icon={<FaUser className="text-gray-700 mb-3 ml-2 text-0.5xl" />}
            type="text"
            placeholder="Enter your HRMS No"
            value={formData.HRMS_No}
            onChange={handleChange}
          />

          <CustomInput
            id="email"
            name="email"
            label="Email"
            icon={<FaEnvelope className="text-gray-700 mb-3 ml-2 text-0.5xl" />}
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <SearchDropDown
            icon={<FaSchool className="text-gray-700 text-0.5xl" />}
            label={"Branch"}
            itemKey={"branchName"}
            items={BRANCHES}
            placeholder={"Select Branch"}
            setValue={handleSearchDropdownChange}
          />

          <SearchDropDown
            icon={<FaMapMarkerAlt className="text-gray-700 text-0.5xl" />}
            label={"Region"}
            itemKey={"region"}
            items={REGION}
            placeholder={"Select Region"}
            setValue={handleSearchDropdownChange}
          />

          <CustomInput
            id="mobileNo"
            name="mobileNo"
            label="Mobile Number"
            icon={
              <FaMobileAlt className="text-gray-700 mb-3 ml-2 text-0.5xl" />
            }
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.mobileNo}
            onChange={handleChange}
          />

          <CustomInput
            id="password"
            name="password"
            label="Password"
            icon={<FaLock className="text-gray-700 mb-3 ml-2 text-0.5xl" />}
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaUserTag className="text-gray-700 text-0.5xl" />
              <label className="text-gray-700 text-sm font-bold">Role</label>
            </div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="sub-admin">Sub-admin</option>
            </select>
          </div>

          <AuthButton buttonName="Register" />

          <div className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
