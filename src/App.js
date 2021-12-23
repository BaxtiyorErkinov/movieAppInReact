import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from './components/MainNav.js';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';
import Container from '@mui/material/Container';

function App() {
  const [hello, setHello] = useState(false);
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/search" element={<Search/>} />

          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
