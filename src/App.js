import React, { useState } from 'react';
import './App.css';

import PaginaNaoEncontrada from './components/PaginaNaoEncontrada';
import LandingPageDev from './components/LandingPage copy';

import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';

import Home from './components/LandingPage copy/content/home/home';

const App = () => {
    const [showNav, setShowNav] = useState(true)

  return (
      <div className="divAppContainer">
          <MemoryRouter>

        <div>
          {/* {showNav && <Navbar />} */}
          <Routes>
            <Route path="/*" element={<PaginaNaoEncontrada />} />
            <Route path="/" element={<LandingPageDev funcNav={setShowNav} />} />
            <Route path="/home" element={<Home />} />
            {/* <Route exact path="/login" element={<Login funcNav={setShowNav} />} /> */}
            {/* <Route exact path="/cadastro" element={<Cadastro funcNav={setShowNav} />} /> */}
            {/* 
            <Route path="/feed/:id" element={<Feed />} />
            <Route path="/games" element={<Jogos />} />
            <Route path="/about" element={<Sobre />} />
            <Route path="/chaves" element={<Chaves />} />
            <Route path="/criartorneio" element={<CriarTorneio />} />
            <Route path="/criarequipe" element={<CriarEquipe />} />
            <Route path={`/admin/${process.env.REACT_APP_MYKEY}/:id`} element={<Admin />} /> */}
            {/* <Route path="/userNotFound" element={<UsuarioNaoEncontrado />} /> */}
          </Routes>
        </div>

          </MemoryRouter>
    </div>
  )
}

export default App;
