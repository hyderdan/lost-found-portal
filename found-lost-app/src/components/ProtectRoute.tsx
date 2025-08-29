// Example ProtectedRoute component
// filepath: c:\Users\HYDER DANISH\OneDrive\Desktop\found-lost-portal\found-lost-app\src\components\ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = sessionStorage.getItem('userId') !== null ;
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;