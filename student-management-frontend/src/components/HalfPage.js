import React, { useState } from "react";
import StudentForm from "./StudentForm";
import StudentsList from "./StudentsList";
import Navbar from "./Navbar";

const HalfPage = () => {
    const [refreshFlag, setRefreshFlag] = useState(false);

    const triggerRefresh = () => setRefreshFlag(!refreshFlag);

    return (
        <>
            <Navbar />
            <StudentForm onUserCreated={triggerRefresh} />
            <StudentsList key={refreshFlag} />
        </>
    );
};

export default HalfPage;