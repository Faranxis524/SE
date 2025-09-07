import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Storytelling from './components/Storytelling';
import Campaigns from './components/Campaigns';
import Gallery from './components/Gallery';
import About from './components/About';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageVideos from './components/admin/ManageVideos';
import ManageBlogs from './components/admin/ManageBlogs';
import ManageProducts from './components/admin/ManageProducts';
import ManageGallery from './components/admin/ManageGallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/storytelling" element={<Storytelling />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/videos" element={<ManageVideos />} />
          <Route path="/admin/blogs" element={<ManageBlogs />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
