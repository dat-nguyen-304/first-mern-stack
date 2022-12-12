import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ({ element: Component }) => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);
    if (authLoading) {
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    console.log('isAuthenticated: ', isAuthenticated);
    return (
        isAuthenticated ?
            Component
            :
            <Navigate to="/login" />
    )

}

export default ProtectedRoute;