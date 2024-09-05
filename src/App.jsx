import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './shared/Header/Header';
import Home from './pages/Home/Home'; // Импортируем Home
import Admin from './pages/Admin/Admin'; // Импортируем Admin
import './index.css'; // Импортируем общий CSS
import ServiceDetails from './pages/Home/ServicesBlock/ServicesBlock';

function App() {
  return (
    <Router>
      <Header />
      <div className="pageContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/depilation" element={<ServiceDetails service="depilation" />} />
          <Route path="/manicure" element={<ServiceDetails service="manicure" />} />
          <Route path="/brows" element={<ServiceDetails service="brows" />} />
          <Route path="/haircut" element={<ServiceDetails service="haircut" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


localStorage.setItem('username', 'admin');
localStorage.setItem('password', 'admin');