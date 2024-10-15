
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

function PrivateRoute() {
   const {currentUser} = useSelector((state)=>state.auth)
   if (!currentUser) {
    return <Navigate to='/signin' />;
}


switch (currentUser.role) {
    case 'admin':
        return <Navigate to='/adminp'/>;
    case 'customer':
        return <Navigate to='/customerp'/>;
    case 'resturant_owner':
        return <Navigate to='/resturantp' />;
    
     case 'delivery_person':
         return <Navigate to='/deliveryp' />;
    // Add more roles as needed
    default:
        return <Navigate to='/' />;
}

}

export default PrivateRoute;
