
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

function PrivateRoute() {
   const {currentUser} = useSelector((state)=>state.auth)
   if (!currentUser) {
    return <Navigate to='/signin' />;
}


switch (currentUser.role) {
    case 'admin':
        return <Navigate to='/admin-p' />;
    case 'customer':
        return <Navigate to='/customer-p' />;
    case 'resturant_owner':
        return <Navigate to='/resturant-p' />;
    
     case 'delivery_person':
         return <Navigate to='/delivery-p' />;
    // Add more roles as needed
    default:
        return <Navigate to='/' />;
}

}

export default PrivateRoute;
