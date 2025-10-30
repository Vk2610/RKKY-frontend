import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BRANCHES } from "../constants/branches";


export default function RKKYForm() {
  const currentYear = new Date().getFullYear();
//   const token = localStorage.getItem("token");
//   const decoded = jwtDecode(token);
//   const id = decoded.id;

  const [formData, setFormData] = useState({
    id: id,
    memberNo: profileData.memberNo,
    fullName: profileData.fullName,
    designation: profileData.designation,
    branch: profileData.branch,
    permanentAddress: profileData.permanentAddress,
    mobileNo: profileData.mobileNo,
    whatsappNo: profileData.whatsappNo,
    email: profileData.email,
    appointmentDate: profileData.appointmentDate,
    confirmationDate: profileData.confirmationDate,
    birthDate: profileData.birthDate,
    retirementDate: profileData.retirementDate,
    bankMemberNo: profileData.bankMemberNo,
    bankBranch: profileData.bankBranch,
    pre2017MemberNo: profileData.pre2017MemberNo,
    subscriptionAmount: profileData.subscriptionAmount,
    hrmsNo: profileData.hrmsNo,
    nomineeName: profileData.nomineeName,
    nomineeRelation: profileData.nomineeRelation,
    alternateNomineeName: profileData.alternateNomineeName,
    alternateNomineeRelation: profileData.alternateNomineeRelation,
    signature: profileData.signature || "",
  });

  console.log("Initial form data:", formData);

  const [errors, setErrors] = useState({});
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Track payment status
  const [paymentVerified, setPaymentVerified] = useState(false); // Add payment state to track both 
  const [file, setFile] = useState(null);
  const [sign, setSign] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [branchSearch, setBranchSearch] = useState("");
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBranchSelect = (selectedBranch) => {
    setFormData((prev) => ({ ...prev, branch: selectedBranch }));
    setBranchSearch(selectedBranch);
    setShowBranchDropdown(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileURL);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.memberNo) newErrors.memberNo = "सभासद क्र. आवश्यक आहे";
    if (!formData.fullName) newErrors.fullName = "संपूर्ण नाव आवश्यक आहे";
    if (!formData.designation) newErrors.designation = "हुदा आवश्यक आहे";
    if (!formData.branch) newErrors.branch = "शाखा आवश्यक आहे";
    if (!formData.permanentAddress)
      newErrors.permanentAddress = "कायमचा पत्ता आवश्यक आहे";
    if (!formData.mobileNo || !/^[0-9]{10}$/.test(formData.mobileNo))
      newErrors.mobileNo = "मोबाईल नंबर 10 अंकी असावा";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "योग्य ईमेल पत्ता द्या";
    if (!formData.appointmentDate)
      newErrors.appointmentDate = "नेमणूक तारीख आवश्यक आहे";
    if (!formData.confirmationDate)
      newErrors.confirmationDate = "कायम झाल्याची तारीख आवश्यक आहे";
    if (!formData.birthDate) newErrors.birthDate = "जन्म तारीख आवश्यक आहे";
    if (!formData.retirementDate)
      newErrors.retirementDate = "सेवानिवृत्ती तारीख आवश्यक आहे";
    if (!formData.hrmsNo) newErrors.hrmsNo = "HRMS NO आवश्यक आहे";
    if (!formData.nomineeName)
      newErrors.nomineeName = "नॉमिनीचे नाव आवश्यक आहे";
    if (!formData.nomineeRelation)
      newErrors.nomineeRelation = "नॉमिनीचे नाते आवश्यक आहे";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("कृपया सर्व आवश्यक फील्ड भरा");
      return;
    }

    // if (!isPaymentSuccessful) {
    //   toast.error("Please complete the payment before submitting the form.");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/saveApplicationForm",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Registration data submitted successfully!");
        setFormData({
          id: id,
          memberNo: "",
          fullName: "",
          designation: "",
          branch: "",
          permanentAddress: "",
          mobileNo: "",
          whatsappNo: "",
          email: "",
          appointmentDate: "",
          confirmationDate: "",
          birthDate: "",
          retirementDate: "",
          bankMemberNo: "",
          bankBranch: "",
          pre2017MemberNo: "",
          subscriptionAmount: "",
          hrmsNo: "",
          nomineeName: "",
          nomineeRelation: "",
          alternateNomineeName: "",
          alternateNomineeRelation: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting registration data:", error);
      toast.error("Failed to submit registration data. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setShowBranchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <ToastContainer />
      <div className="border p-4 border-black">
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <p className="font-bold">रयत शिक्षण संस्था, सातारा</p>
            <p className="font-bold">रयत सेवक कुटुंब कल्याण योजना </p>
            <p>(वर्गणीदार होण्यासाठीचा करावयाचा अर्ज व संमतीपत्रक)</p>
          </div>
          <div className="border border-black w-1/4 h-14 flex items-center justify-center">
            <label>सभासद क्र. KK-</label>
            <input
              type="text"
              name="memberNo"
              value={formData.memberNo}
              onChange={handleChange}
              className="w-30 p-2 my-2"
            />
            {errors.memberNo && (
              <p className="text-red-500 text-sm">{errors.memberNo}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <p>प्रति,</p>
          <p>मा. चेअरमन,</p>
          <p>रयत सेवक कुटुंब कल्याण योजना</p>
          <p>रयत शिक्षण संस्था, सातारा</p>
          <p>यांना--</p>
        </div>

        <div className="mt-4">
          <p>
            महोदय,
            <br />
            रयत सेवक कुटुंब कल्याण योजनेची घटना व नियम मी वाचले असून ते मला
            मान्य आहेत.त्यासाठी या अर्जासोबत नियमाप्रमाणे प्रवेश फी रु. १००/- व
            वर्गणी रु.{" "}
            <input type="text" className="border-b border-black w-20" />
            मी माझ्या शाखेमार्फत पाठवित आहे .रयत सेवक कुटुंब कल्याण योजनेसाठी
            संपूर्ण वर्गणी रु. ५०००/- ही एप्रिल {currentYear} ते मार्च{" "}
            {currentYear + 1} या आर्थिक वर्षात सामान ५ हप्त्याने माझ्या पगारातून
            कपात करून रयत सेवक कुटुंब कल्याण योजनेकडे पाठविणेबाबत मी माझ्या
            शाखाप्रमुखांना संमती देत आहे . तरी मला रयत सेवक कुटुंब कल्याण
            योजनेचे सभासद करून घ्यावे.
          </p>
        </div>

        <h2 className="font-bold mt-6 underline text-center">
          माझी माहिती खालीलप्रमाणे आहे
        </h2>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label>१. संपूर्ण नाव: </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border-b border-black w-1/2"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
            <label className="ml-4">२. हुद्दा : </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="border-b border-black w-1/3"
            />
            {errors.designation && (
              <p className="text-red-500 text-sm">{errors.designation}</p>
            )}
          </div>

          <div className="relative">
            <label>३. शाखा: </label>
            <input
              type="text"
              value={branchSearch}
              onChange={(e) => {
                setBranchSearch(e.target.value);
                setShowBranchDropdown(true);
              }}
              onFocus={() => setShowBranchDropdown(true)}
              placeholder="शाखा शोधा..."
              className="border-b border-black w-2/3"
            />
            {errors.branch && (
              <p className="text-red-500 text-sm">{errors.branch}</p>
            )}

            {showBranchDropdown && (
              <div className="absolute z-10 w-2/3 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {BRANCHES.filter((branch) =>
                  branch.toLowerCase().includes(branchSearch.toLowerCase())
                ).map((branch) => (
                  <div
                    key={branch}
                    onClick={() => handleBranchSelect(branch)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {branch}
                  </div>
                ))}
                {BRANCHES.filter((branch) =>
                  branch.toLowerCase().includes(branchSearch.toLowerCase())
                ).length === 0 && (
                  <div className="px-4 py-2 text-gray-500">
                    कोणतीही शाखा सापडली नाही
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label>४. कायमचा पत्ता: </label>
            <input
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="border-b border-black w-full"
            />
            {errors.permanentAddress && (
              <p className="text-red-500 text-sm">{errors.permanentAddress}</p>
            )}
          </div>

          <div>
            <label>Mobile No. </label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm">{errors.mobileNo}</p>
            )}
            <label className="ml-4">WhatsApp Mobile No. </label>
            <input
              type="text"
              name="whatsappNo"
              value={formData.whatsappNo}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
          </div>

          <div>
            <label>Email </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b border-black w-1/2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label>५. संस्थेतील नेमणूक तारीख: </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            {errors.appointmentDate && (
              <p className="text-red-500 text-sm">{errors.appointmentDate}</p>
            )}
            <label className="ml-4">६. कायम झाल्याची तारीख: </label>
            <input
              type="date"
              name="confirmationDate"
              value={formData.confirmationDate}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            {errors.confirmationDate && (
              <p className="text-red-500 text-sm">{errors.confirmationDate}</p>
            )}
          </div>

          <div>
            <label>७. जन्म तारीख: </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate}</p>
            )}
            <label className="ml-4">८. सेवानिवृत्ती तारीख: </label>
            <input
              type="date"
              name="retirementDate"
              value={formData.retirementDate}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            {errors.retirementDate && (
              <p className="text-red-500 text-sm">{errors.retirementDate}</p>
            )}
          </div>

          <div>
            <label>९. दि रयत सेवक कॉ-ऑफ बँकेचा सभासद क्र.: </label>
            <input
              type="text"
              name="bankMemberNo"
              value={formData.bankMemberNo}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            <label className="ml-2">शाखा </label>
            <input
              type="text"
              name="bankBranch"
              value={formData.bankBranch}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
          </div>

          <div>
            <label>
              १०. ३१ मार्च २०१७ पूर्वी कुटुंब कल्याण योजनेचा सभासद असल्यास सभासद
              क्र:{" "}
            </label>
            <input
              type="text"
              name="pre2017MemberNo"
              value={formData.pre2017MemberNo}
              onChange={handleChange}
              className="border-b border-black w-1/2"
            />
          </div>

          <div>
            <label>११. व वर्गणी रु.: </label>
            <input
              type="text"
              name="subscriptionAmount"
              value={formData.subscriptionAmount}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            <label className="ml-4">HRMS NO : </label>
            <input
              type="text"
              name="hrmsNo"
              value={formData.hrmsNo}
              onChange={handleChange}
              className="border-b border-black w-1/4"
            />
            {errors.hrmsNo && (
              <p className="text-red-500 text-sm">{errors.hrmsNo}</p>
            )}
          </div>

          <div className="mt-4 mb-4">
            <p>
              <label>माझे वारस (नॉमिनी): </label>
              <input
                type="text"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
                className="border-b border-black w-1/4"
              />
              {errors.nomineeName && (
                <p className="text-red-500 text-sm">{errors.nomineeName}</p>
              )}
              <label className="ml-4">नाते : </label>
              <input
                type="text"
                name="nomineeRelation"
                value={formData.nomineeRelation}
                onChange={handleChange}
                className="border-b border-black w-1/4"
              />
              {errors.nomineeRelation && (
                <p className="text-red-500 text-sm">{errors.nomineeRelation}</p>
              )}
            </p>
          </div>

          <div className="mt-10 border-t pt-6">
            <p className="text-center font-semibold">किंवा</p>
            <div className="mt-4">
              <p>
                माझा वर नमूद केलेला वारस (नॉमिनी) हयात नसेल तर त्याच्या पश्चात
                आकस्मिक साहाय्य निधीची रक्कम
              </p>
              <div className="mt-4 mb-4">
                <label>माझे वारस (नॉमिनी): </label>
                <input
                  type="text"
                  name="alternateNomineeName"
                  value={formData.alternateNomineeName}
                  onChange={handleChange}
                  className="border-b border-black w-1/4"
                />
                {errors.alternateNomineeName && (
                  <p className="text-red-500 text-sm">
                    {errors.alternateNomineeName}
                  </p>
                )}
                <label className="ml-4">नाते : </label>
                <input
                  type="text"
                  name="alternateNomineeRelation"
                  value={formData.alternateNomineeRelation}
                  onChange={handleChange}
                  className="border-b border-black w-1/4"
                />
                {errors.alternateNomineeRelation && (
                  <p className="text-red-500 text-sm">
                    {errors.alternateNomineeRelation}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 text-right mx-5">
            <div className="mb-4">
              <label className="block mb-2">Upload Signature Document:</label>
              <input
                type="file"
                className="w-full border rounded p-2"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
            </div>

            {previewUrl && (
              <div className="mt-6 border rounded-lg overflow-hidden">
                {file && file.type.startsWith("image/") ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-h-96 object-contain"
                  />
                ) : (
                  <embed
                    src={previewUrl}
                    type="application/pdf"
                    className="w-[50vw] h-[200px]"
                  />
                )}
              </div>
            )}

            {file && !formData.signature && (
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={fileUploadFunc}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Upload Document
                </button>
              </div>
            )}
            <div>सभासद सही</div>
          </div>

          <div className="flex gap-3 justify-around p-4 mt-6">
            <button
              onClick={handlePayment}
              type="button"
              className="bg-green-500 w-2xl text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              disabled={
                !formData.fullName || !formData.email || !formData.mobileNo
              }
            >
              {isPaymentSuccessful
                ? "Payment Completed ✓"
                : "Proceed to Payment (₹ 100/-)"}
            </button>
            <button
              type="submit"
              // disabled={!paymentVerified || !formData.signature}
              // className={`w-2xl px-4 py-2 rounded transition duration-200 ${
              //   paymentVerified && formData.signature
              //     ? "bg-blue-500 text-white hover:bg-blue-600"
              //     : "bg-gray-400 text-gray-700 cursor-not-allowed"
              // }`}
              onClick={handleSubmit}
            >
              सबमिट करा
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
