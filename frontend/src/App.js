import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './components/Navbar';
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
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [productsRes, galleriesRes, videosRes, blogsRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/products'),
        axios.get('http://127.0.0.1:8000/api/galleries'),
        axios.get('http://127.0.0.1:8000/api/videos'),
        axios.get('http://127.0.0.1:8000/api/blogs')
      ]);

      setProducts(productsRes.data);
      setGalleries(galleriesRes.data);
      setVideos(videosRes.data);
      setBlogs(blogsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data
      setProducts([{ id: 1, name: 'Traditional Blanket', description: 'Handwoven blanket with indigenous patterns.', shopee_link: 'https://shopee.ph/product/1' }]);
      setGalleries([{ id: 1, title: 'Traditional Weaving Process', description: 'Artisans at work preserving ancient techniques' }]);
      setVideos([]);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="fs-1 mb-3" style={{ color: '#daa520' }}>⏳</div>
          <p style={{ color: '#a52a2a' }}>Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <NavigationBar />
            <div id="home">
              <Home />
            </div>
            <div id="products">
              <Products products={products} />
            </div>
            <div id="storytelling">
              <Storytelling videos={videos} blogs={blogs} />
            </div>
            <div id="gallery">
              <Gallery galleries={galleries} />
            </div>
            <div id="campaigns">
              <Campaigns />
            </div>
            <div id="about">
              <About />
            </div>
            <footer className="bg-dark text-light text-center py-4 mt-5">
              <Container>
                <p className="mb-0">&copy; 2023 Cordillera Indigenous Weaving. All rights reserved.</p>
              </Container>
            </footer>
          </div>
        } />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/videos" element={<ManageVideos />} />
        <Route path="/admin/blogs" element={<ManageBlogs />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/gallery" element={<ManageGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
