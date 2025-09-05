// Util
import { Routes, Route } from 'react-router-dom'
// Layouts
import MainLayout from './MainLayout'
import AuthLayout from './AuthLayout'
// Main Layout Routes
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Wall from './pages/Wall/Wall'
import Contact from './pages/Contact/Contact'
import Account from './pages/Account/Account'
import Post from './pages/Post/Post'
import Plans from './pages/Plans/Plans'
// Auth Layout Routes
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import CheckEmail from './pages/CheckEmail/CheckEmail'
// Account Sections
import Connections from './pages/Account/sections/Connections'
import Security from './pages/Account/sections/Security'
import Basic from './pages/Account/sections/Basic'

// NotFound
import NotFound from './pages/NotFound/NotFound'
import SignedInGuard from './SignedInGuard'

import { Toast } from 'radix-ui'
import Posts from './pages/Account/sections/Posts'
import PostView from './components/PostView/PostView'





function App() {

  return (
    <>
    <Toast.Provider swipeDirection="right" duration={3500}>
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />}/>
          <Route path="wall" element={<Wall />}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="plans" element={<Plans />}/>
          <Route path="post/:uid/:id" element={<PostView />}/>
        </Route>

        {/* Auth Layout (No NavBar) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/check-email" element={<CheckEmail />}/>
        </Route>

        {/* Protected Routes */}
        <Route element={<SignedInGuard />}>
          <Route path="post" element={<Post />}/>
          {/* Account */}
          <Route path="account" element={<Account />}>
            <Route index element={<Basic />}/>
            <Route path="connections" element={<Connections />}/>
            <Route path="security" element={<Security />}/>
            <Route path="posts" element={<Posts />}/>
          </Route>
          
        </Route>

        {/* Non-existent path returns 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toast.Viewport
        className="
          fixed bottom-4 right-4 z-[9999]
          flex flex-col gap-2 w-[360px] max-w-[100vw]
          outline-none
        "
      />

    </Toast.Provider>
    </>
  )
}

export default App
