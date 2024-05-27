import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx'
import Post from './pages/Post.jsx'
import NotFound from './pages/NotFound.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Post/:postId" element={<Post />} />
        <Route path= "*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  };

export default App;