import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnimatedHero from './components/AnimatedHero'
import About from './components/About'
import Booking from './components/Booking'
import Billing from './components/Billing'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import HomeLayout from './Layout/HomeLayout'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import Flights from './components/Flights'
import Admin from './components/Admin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<AnimatedHero />} />
          <Route path="about" element={<About />} />
          <Route path="flights" element={<Flights />} />
          <Route path="booking" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="admin" element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          } />
          <Route path="billing" element={<Billing />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer theme="dark" position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </BrowserRouter>
  )
}

export default App
