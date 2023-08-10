import React from 'react'
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Coins from './Components/Coins';
import Exchange from './Components/Exchange';
import CoinDetail from './Components/CoinDetail';
import Footer from './Components/Footer';
function App() {
  return (
    
  
   <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/coins' element={<Coins />} />
      <Route path='/exchange' element={<Exchange />} />
      <Route path='/coin/:id' element={<CoinDetail />} />
    </Routes>
    <Footer />
   </Router>
   
  );
}

export default App;
