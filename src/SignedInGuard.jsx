import React from 'react'
import { useAuth } from './context/AuthContext'
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function SignedInGuard() {
    const { user , authLoading } = useAuth();
    const location = useLocation();

    if (authLoading) return null;


    const signedIn = !!user && !user.isAnonymous;
    return (
    signedIn ?  <div className="min-h-[100dvh] flex flex-col">
            <NavBar />
            <main className="flex-1 gap-8">
                <Outlet/>
            </main>
            <Footer/>
        </div> : <Navigate to="/login" replace state={{ from: location }}/>
  )
}

export default SignedInGuard