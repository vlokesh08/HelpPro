import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({children} : any) => {
    const user = useSelector((state: any) => state.user);
    
    if(!user.email) {
        return <Navigate to="/" />
    }
 return children

};

export default ProtectedRoute;