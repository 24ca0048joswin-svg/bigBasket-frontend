import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute(){
    const user = window.localStorage.getItem("token");
    return user ? <Outlet/>: 
    <Navigate to="/"/>
}

export default ProtectedRoute;