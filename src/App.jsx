import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';
import Home from './pages/Home/Home'; // Импортируем Home
import Admin from './pages/Admin/Admin'; // Импортируем Admin
import './index.css'; // Импортируем общий CSS
import ServiceDetails from './pages/Home/ServicesBlock/ServicesBlock';
import Depilation from './pages/services/Depilation';
import Brows from './pages/services/Brows';
import Manicure from './pages/services/Manicure';
import Haircut from './pages/services/Haircut';



function App() {
  return (
    <Router>
      <Header />
      <div className="pageContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/brows" element={<Brows />} />
          <Route path="/manicure" element={<Manicure />} />
          <Route path="/haircut" element={<Haircut />} />
          <Route path="/depilation" element={<Depilation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


localStorage.setItem('username', 'admin');
localStorage.setItem('password', 'admin');