import React, { useState, useEffect } from 'react';
import NavigationBar from './Navbar';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = () => {
    axios.get('http://127.0.0.1:8000/api/galleries')
      .then(response => {
        setGalleryImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching gallery images:', error);
        setLoading(false);
        // Fallback to sample data if API fails
        setGalleryImages([
          { id: 1, title: 'Traditional Weaving Process', description: 'Artisans at work preserving ancient techniques' },
          { id: 2, title: 'Indigenous Patterns', description: 'Beautiful geometric designs with cultural significance' },
          { id: 3, title: 'Community Gathering', description: 'Weavers sharing knowledge and stories' },
          { id: 4, title: 'Finished Products', description: 'Completed textiles ready for cultural celebrations' },
          { id: 5, title: 'Natural Dyes', description: 'Using traditional plant-based color sources' },
          { id: 6, title: 'Modern Applications', description: 'Traditional weaving in contemporary contexts' }
        ]);
      });
  };

  return (
    <div>
      <NavigationBar />

      <Container fluid className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4" style={{ color: '#800000' }}>Gallery</h1>
              <div className="fs-1 mb-4" style={{ color: '#daa520' }}>📸</div>
              <p className="lead mb-4" style={{ color: '#a52a2a' }}>
                Explore our collection of mobile photography and graphic design showcasing the beauty of Cordillera indigenous weaving.
              </p>
            </div>
            {loading ? (
              <div className="text-center">
                <div className="fs-1 mb-3" style={{ color: '#daa520' }}>⏳</div>
                <p style={{ color: '#a52a2a' }}>Loading gallery images...</p>
              </div>
            ) : (
              <Row>
                {galleryImages.map(image => (
                  <Col md={6} lg={4} className="mb-4" key={image.id}>
                    <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                      {image.image ? (
                        <Card.Img
                          variant="top"
                          src={`http://127.0.0.1:8000/storage/${image.image}`}
                          alt={image.title}
                          style={{ height: '250px', objectFit: 'cover', borderBottom: '2px solid #daa520' }}
                          onError={(e) => {
                            e.target.src = '/placeholder-image.png';
                            e.target.alt = 'Image not available';
                          }}
                        />
                      ) : (
                        <div style={{ height: '250px', background: 'linear-gradient(135deg, #f5f5dc 0%, #e6e6fa 100%)', borderBottom: '2px solid #daa520' }} className="d-flex align-items-center justify-content-center">
                          <div className="text-center">
                            <div className="fs-1 mb-2" style={{ color: '#daa520' }}>🖼️</div>
                            <small style={{ color: '#a52a2a' }}>No Image</small>
                          </div>
                        </div>
                      )}
                      <Card.Body>
                        <Card.Title style={{ color: '#800000' }}>{image.title}</Card.Title>
                        <Card.Text style={{ color: '#a52a2a' }}>{image.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-light text-center py-4 mt-5">
        <Container>
          <p className="mb-0">&copy; 2023 Cordillera Indigenous Weaving. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Gallery;