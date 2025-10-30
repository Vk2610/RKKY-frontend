// import React, { useState } from "react";

// export default function MadatAarj() {
//   const [formData, setFormData] = useState({
//     applicantName: "",
//     institutionName: "",
//     admissionDate: "",
//     gender: "",
//     totalYearsOfService: "",
//     salary: "",
//     phone: "",
//     patientName: "",
//     relation: "",
//     illnessPeriodFrom: "",
//     illnessPeriodTo: "",
//     medicineExpenses: "",
//     doctorBill: "",
//     totalExpenses: "",
//     schoolHelpReceived: "",
//     treatmentDetails: "",
//     otherHelpReceived: "",
//     yearlyHelp: "",
//     previouslyReceivedHelp: "",
//     requestedAmount: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
//       <h2 style={{ textAlign: "center" }}>
//         स्वराज शिक्षण संस्था, सेवक कल्याणकर निधी, सातारा
//       </h2>
//       <h3 style={{ textAlign: "center" }}>मदत मागणी अर्ज</h3>

//       <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
//         <label>
//           अर्जदाराचे संपूर्ण नाव (पूर्ण आकाराने):{" "}
//           <input
//             type="text"
//             name="applicantName"
//             value={formData.applicantName}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           शाळेचे नाव:{" "}
//           <input
//             type="text"
//             name="institutionName"
//             value={formData.institutionName}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           नेमणुकीची तारीख:{" "}
//           <input
//             type="date"
//             name="admissionDate"
//             value={formData.admissionDate}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           लिंग:{" "}
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">निवडा</option>
//             <option value="male">पुरुष</option>
//             <option value="female">स्त्री</option>
//           </select>
//         </label>

//         <label>
//           संस्थेतील एकूण सेवा कालावधी:{" "}
//           <input
//             type="text"
//             name="totalYearsOfService"
//             value={formData.totalYearsOfService}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           मासिक वेतन:{" "}
//           <input
//             type="number"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           मोबाइल क्रमांक:{" "}
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           आजारी असलेल्या व्यक्तीचे नाव:{" "}
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           नाते:{" "}
//           <input
//             type="text"
//             name="relation"
//             value={formData.relation}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           आजाराचा कालावधी (पासून - पर्यंत):{" "}
//           <div style={{ display: "flex", gap: "10px" }}>
//             <input
//               type="date"
//               name="illnessPeriodFrom"
//               value={formData.illnessPeriodFrom}
//               onChange={handleChange}
//             />
//             <input
//               type="date"
//               name="illnessPeriodTo"
//               value={formData.illnessPeriodTo}
//               onChange={handleChange}
//             />
//           </div>
//         </label>

//         <label>
//           औषधाचे बिल:{" "}
//           <input
//             type="number"
//             name="medicineExpenses"
//             value={formData.medicineExpenses}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           डॉक्टरांचे बिल:{" "}
//           <input
//             type="number"
//             name="doctorBill"
//             value={formData.doctorBill}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           एकूण झालेला खर्च:{" "}
//           <input
//             type="number"
//             name="totalExpenses"
//             value={formData.totalExpenses}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           संस्थेमार्फत आर्थिक मदत मिळाली आहे का?{" "}
//           <select
//             name="schoolHelpReceived"
//             value={formData.schoolHelpReceived}
//             onChange={handleChange}
//           >
//             <option value="">निवडा</option>
//             <option value="yes">होय</option>
//             <option value="no">नाही</option>
//           </select>
//         </label>

//         <label>
//           उपचारांची माहिती:{" "}
//           <textarea
//             name="treatmentDetails"
//             value={formData.treatmentDetails}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           अन्य संस्थांकडून मदत मिळाली आहे का?{" "}
//           <input
//             type="text"
//             name="otherHelpReceived"
//             value={formData.otherHelpReceived}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           वार्षिक सेवक कल्याणकर निधीकडून मदत मिळाली आहे का?{" "}
//           <input
//             type="text"
//             name="yearlyHelp"
//             value={formData.yearlyHelp}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           मागील वर्षी मिळालेल्या मदतीचे तपशील:{" "}
//           <textarea
//             name="previouslyReceivedHelp"
//             value={formData.previouslyReceivedHelp}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           चालू वर्षी आवश्यक रक्कम रुपये:{" "}
//           <input
//             type="number"
//             name="requestedAmount"
//             value={formData.requestedAmount}
//             onChange={handleChange}
//           />
//         </label>

//         <button
//           type="submit"
//           style={{
//             background: "#1e40af",
//             color: "white",
//             border: "none",
//             padding: "10px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           अर्ज सबमिट करा
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function MadatAarj() {
  const [formData, setFormData] = useState({
    applicantName: "",
    schoolName: "",
    joiningDate: "",
    gender: "",
    totalService: "",
    salary: "",
    phone: "",
    patientName: "",
    relation: "",
    illnessFrom: "",
    illnessTo: "",
    medicineBill: "",
    doctorBill: "",
    totalExpenses: "",
    helpReceived: "",
    treatmentDetails: "",
    otherHelp: "",
    yearlyHelp: "",
    previousHelp: "",
    requestedAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form:", formData);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "30px", fontFamily: "Noto Sans Devanagari, sans-serif", lineHeight: "1.7" }}>
      <h2 style={{ textAlign: "center" }}>
        स्वराज शिक्षण संस्था, सेवक कल्याणकर निधी, सातारा
      </h2>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>मदत मागणी अर्ज</h3>

      <p>
        प्रति, <br />
        मा. अध्यक्षमहाशय, <br />
        स्वराज शिक्षण संस्था, सेवक कल्याणकर निधी, सातारा
      </p>

      <p>
        <b>विषय :</b> सेवक कल्याणकर फंडकडून आर्थिक मदत मिळविण्याबाबत.
      </p>

      <p>
        महाराज, <br />
        मी खालील कारणास्तव आपल्याकडील सेवक कल्याणकर फंडकडून आर्थिक मदत मिळावी म्हणून हा अर्ज करीत आहे.
        खाली माझी पूर्ण माहिती दिली आहे.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
        <label>
          १) अर्जदाराचे संपूर्ण नाव (पूर्ण आकाराने):{" "}
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>

        <label>
          शाळेचे नाव:{" "}
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>

        <label>
          अ) नेमणुकीची तारीख:{" "}
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
          />
        </label>

        <label>
          ब) लिंग:{" "}
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">निवडा</option>
            <option value="male">पुरुष</option>
            <option value="female">स्त्री</option>
          </select>
        </label>

        <label>
          क) संस्थेतील एकूण सेवाकालावधी:{" "}
          <input
            type="text"
            name="totalService"
            value={formData.totalService}
            onChange={handleChange}
          />{" "}
          वर्ष
        </label>

        <label>
          २) दर महिन्याचा वेतन (एकूण पगार): ₹{" "}
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </label>

        <label>
          मोबाईल क्र.:{" "}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          ३) ज्याच्या आजारासाठी मदत हवी त्या व्यक्तीचे नाव:{" "}
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>

        <label>
          अर्जदाराशी नाते:{" "}
          <input
            type="text"
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          />
        </label>

        <label>
          ४) आजाराचा कालावधी (पासून – पर्यंत):{" "}
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="date"
              name="illnessFrom"
              value={formData.illnessFrom}
              onChange={handleChange}
            />
            <span>ते</span>
            <input
              type="date"
              name="illnessTo"
              value={formData.illnessTo}
              onChange={handleChange}
            />
          </div>
        </label>

        <label>
          ५) औषधाचे बिल: ₹{" "}
          <input
            type="number"
            name="medicineBill"
            value={formData.medicineBill}
            onChange={handleChange}
          />
        </label>

        <label>
          ६) डॉक्टरांचे बिल: ₹{" "}
          <input
            type="number"
            name="doctorBill"
            value={formData.doctorBill}
            onChange={handleChange}
          />
        </label>

        <label>
          ७) एकूण झालेला खर्च: ₹{" "}
          <input
            type="number"
            name="totalExpenses"
            value={formData.totalExpenses}
            onChange={handleChange}
          />
        </label>

        <label>
          ८) वरिलप्रमाणे झालेल्या खर्चाची पावती प्रमाणक ०१ ते ___ सोबत जोडली आहे.
        </label>

        <label>
          ९) वर नमूद केलेल्या आजारासाठी कोणत्याही संस्थेकडून सॅंक्शन लेटर जोडले आहे का?{" "}
          <select
            name="helpReceived"
            value={formData.helpReceived}
            onChange={handleChange}
          >
            <option value="">निवडा</option>
            <option value="yes">होय</option>
            <option value="no">नाही</option>
          </select>
        </label>

        <label>
          १०) यापूर्वी फंडकडून मदत घेतली आहे का?{" "}
          <select
            name="treatmentDetails"
            value={formData.treatmentDetails}
            onChange={handleChange}
          >
            <option value="">निवडा</option>
            <option value="yes">होय</option>
            <option value="no">नाही</option>
          </select>
        </label>

        <label>
          ११) मदत घेतली असल्यास कोणत्या वर्षी व किती रक्कम:{" "}
          <textarea
            name="otherHelp"
            value={formData.otherHelp}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </label>

        <label>
          १२) मागील वर्षी सेवक कल्याणकर फंडकडून मदत मिळाली आहे का?{" "}
          <select
            name="yearlyHelp"
            value={formData.yearlyHelp}
            onChange={handleChange}
          >
            <option value="">निवडा</option>
            <option value="yes">होय</option>
            <option value="no">नाही</option>
          </select>
        </label>

        <label>
          १३) चालू वर्षी आजारासाठी आवश्यक असलेली रक्कम: ₹{" "}
          <input
            type="number"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          अर्ज सबमिट करा
        </button>
      </form>
    </div>
  );
}
