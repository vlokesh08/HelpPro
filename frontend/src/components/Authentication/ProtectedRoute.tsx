import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({children} : any) => {
    const user = localStorage.getItem("userInfo");
    const data = JSON.parse(user as string);
    
    if(!data) {
        return <Navigate to="/" />
    }
 return children

};

export default ProtectedRoute;