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
// NotFound
import NotFound from './pages/NotFound/NotFound'






function App() {

  return (
    <>
    <Routes>
      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />}/>
        <Route path="about" element={<About />}/>
        <Route path="wall" element={<Wall />}/>
        <Route path="contact" element={<Contact />}/>
        <Route path="account" element={<Account />}/>
        <Route path="post" element={<Post />}/>
        <Route path="plans" element={<Plans />}/>
      </Route>

      {/* Auth Layout (No NavBar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/check-email" element={<CheckEmail />}/>
      </Route>

      {/* Non-existent path returns 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
