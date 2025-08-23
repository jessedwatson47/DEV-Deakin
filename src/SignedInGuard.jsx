import React from 'react'
import { useAuth } from './AuthContext'
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function SignedInGuard() {
    const { user , loading } = useAuth();
    const location = useLocation();

    if (loading) return null;


    const signedIn = !!user && !user.isAnonymous;
  return (
    signedIn ? <Outlet/> : <Navigate to="/login" replace state={{ from: location }}/>
  )
}

export default SignedInGuard