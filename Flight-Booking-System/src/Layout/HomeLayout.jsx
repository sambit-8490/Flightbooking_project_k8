import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function HomeLayout() {
  return (
    <div className="page-shell">
      <Header />
      <main className="site-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default HomeLayout
