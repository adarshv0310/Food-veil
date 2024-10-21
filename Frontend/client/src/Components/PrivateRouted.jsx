import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Admin from '../pages/Dashboard/Admin';
import Customer from '../pages/Dashboard/Customer';
import Delivery from '../pages/Dashboard/Delivery';
import Resturant from '../pages/Dashboard/Resturant';
function PrivateRouted({ element }) {
    const { currentUser } = useSelector((state) => state.auth);

    // Redirect to sign-in if the user is not authenticated
    if (!currentUser) {
        return <Navigate to='/signin' />;
    }

    // Render specific components based on user role
    switch (currentUser.role) {
        case 'admin':
            return <Admin />;
        case 'customer':
            return <Customer />;
        case 'restaurant_owner':
            return <Resturant/>;
        case 'delivery':
            return <Delivery />;
        default:
            return <Navigate to='/' />;
    }
}

export default PrivateRouted;
