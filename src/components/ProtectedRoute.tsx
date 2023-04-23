import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }: any) => {
    const location = useLocation();
    function GetAuth() {
        let Token = window.localStorage.getItem("token");
        if (!Token) {
            return false;
        }
        return true;
    }
    function getCookie() {
        let array = document.cookie.split(";");
        for (const item of array) {
            if (item.startsWith("jwt=")) {
                return item.substr(6);
            }
        }
    }

    // console.log(getCookie()?.length)
    console.log("AUTH",GetAuth())
    if (!GetAuth()) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
};

export default ProtectedRoute;