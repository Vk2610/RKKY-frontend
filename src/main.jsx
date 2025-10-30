import { createRoot } from "react-dom/client";
import "./index.css";

// import UploadComponent,{handleUploadComplete} from "./components/UploadComponent";
// import { AdminSection, SuperAdminSection, UserSection } from "./components/forms/MadarAarjB";
// import App from "./App.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
import MadatAarj from "./components/forms/MadatAarjA.jsx";

// createRoot(document.getElementById("root")).render(
//     <div style={{ padding: "40px", background: "#f9fafb", minHeight: "100vh" }}>
//       <h2 style={{ textAlign: "center" }}>📂 File Upload Portal</h2>
//       <UploadComponent
//         multiple={true}
//         maxFileSizeMB={15}
//         accept={["image/*", ".pdf", ".docx", ".zip"]}
//         onUpload={handleUploadComplete}
//       />
//     </div>
// );

createRoot(document.getElementById("root")).render(
    <MadatAarj/>
);