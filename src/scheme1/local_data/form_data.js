export let profileData = {
    id: "",
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
};

export const setProfileData = (data) => {
    console.log("setting form data", data);
    profileData = data;
    console.log("form data set", profileData);
}