import { Navigate } from "react-router-dom";

function Protected({children}){
    
    var token = localStorage.getItem("token");
    console.log("user logged in ", token)
    if(!token){
        return <Navigate to="/"/>
    }
    return children;
}

export default Protected;