import { useState } from "react";
import profileDataContext from "../contexts/profileDataContext";

export default function ProfileDataProvider({ children }) {
    const [profileData, setProfileData] = useState({});
    return (
        <profileDataContext.Provider value={{ profileData, setProfileData }}>
            {children}
        </profileDataContext.Provider>
    );
}


