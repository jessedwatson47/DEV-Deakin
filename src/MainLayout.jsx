import React from 'react'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
        <div className="min-h-[100dvh] flex flex-col">
            <NavBar />
            <main className="flex-1 gap-8">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    </>
  )
}

export default MainLayout