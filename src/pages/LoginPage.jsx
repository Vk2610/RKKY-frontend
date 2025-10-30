import { Link } from "react-router-dom";
import bgImg from "../assets/rayat-img.jpg";
import { FaLock, FaUser } from "react-icons/fa";
import AuthButton from "../components/AuthButton";
import SignOutButton from "../components/SignOutButton";
import CustomInput from "../components/CustomInput";

function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    // try {
    //   const response = await axios.post("http://localhost:3000/auth/login", {
    //     HRMS_No,
    //     password,
    //   });

    //   const token = response.data.token;
    //   localStorage.setItem("token", token);
    //   const decoded = jwtDecode(token);
    //   const role = decoded.role;
    //   localStorage.setItem("role", role);
    //   navigate(`/${role}`);
    // } catch (err) {
    //   setError(
    //     err.response?.data?.message || "Login failed. Please try again."
    //   );
    // }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="bg-white bg-opacity-95 p-8 rounded-[25px] shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <CustomInput
            id="username"
            name="username"
            label="Username"
            icon={<FaUser className="text-gray-700 mb-3 ml-2 text-0.5xl" />}
            type="text"
            placeholder="Enter your username"
            value=""
            onChange={() => {}}
          />

          <CustomInput
            id="password"
            name="password"
            label="Password"
            icon={<FaLock className="text-gray-700 mb-3 ml-2 text-0.5xl" />}
            type="password"
            placeholder="Enter your password"
            value=""
            onChange={() => {}}
          />

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <AuthButton buttonName={"Login"} />

          <div className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
