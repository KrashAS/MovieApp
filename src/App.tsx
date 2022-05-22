import React from "react";
import Container from "@mui/material/Container";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { FullMovie } from "./pages/FullMovie";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<FullMovie />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
