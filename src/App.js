import React, { useState, useEffect  } from 'react';
import './App.css';

import PaginaNaoEncontrada from './components/PaginaNaoEncontrada';
import LandingPageDev from './components/LandingPage copy';

import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';

import Home from './components/LandingPage copy/content/home/home';

const App = () => {
    const [showNav, setShowNav] = useState(true)
    useEffect(() => {
      // Attempt to lock the screen orientation to landscape
      screen.orientation.lock("landscape").catch((error) => {
        // Handle the error
        console.error(error);
      });
    }, []);
  return (
      <div className="divAppContainer">
          <MemoryRouter>
        <div>
          <Routes>
            <Route path="/*" element={<PaginaNaoEncontrada />} />
            <Route path="/" element={<LandingPageDev funcNav={setShowNav} />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>

          </MemoryRouter>
    </div>
  )
}

export default App;
