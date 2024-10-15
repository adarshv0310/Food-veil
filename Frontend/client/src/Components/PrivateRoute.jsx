
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Adminprofile from '../pages/Profile/Adminprofile';
import Customerprofile from '../pages/Profile/Customerprofile';
import Deliveyperson from '../pages/Profile/Deliveyperson';
import ResturantProfile from '../pages/Profile/ResturantProfile';

function PrivateRoute({ element }) {
    const { currentUser } = useSelector((state) => state.auth);

    // Redirect to sign-in if the user is not authenticated
    if (!currentUser) {
        return <Navigate to='/signin' />;
    }

    // Render specific components based on user role
    switch (currentUser.role) {
        case 'admin':
            return <Adminprofile />;
        case 'customer':
            return <Customerprofile />;
        case 'restaurant_owner':
            return <ResturantProfile />;
        case 'delivery_person':
            return <Deliveyperson />;
        default:
            return <Navigate to='/' />;
    }
}

export default PrivateRoute;

