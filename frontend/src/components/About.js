import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './Navbar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const About = () => {
  return (
    <div>
      <NavigationBar />

      <Container fluid className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4" style={{ color: '#800000' }}>About Us</h1>
              <div className="fs-1 mb-4" style={{ color: '#daa520' }}>👥</div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card className="border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="py-5">
                <Row>
                  <Col lg={6} className="mb-4">
                    <div className="text-center mb-4">
                      <div className="fs-1 mb-3" style={{ color: '#daa520' }}>🏔️</div>
                      <h3 style={{ color: '#800000' }}>Our Heritage</h3>
                      <p style={{ color: '#a52a2a' }}>
                        The Cordillera region is home to diverse indigenous communities with rich cultural traditions.
                        Our weaving practices have been passed down through generations, each pattern telling
                        a story of our ancestors and our connection to the land.
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} className="mb-4">
                    <div className="text-center mb-4">
                      <div className="fs-1 mb-3" style={{ color: '#daa520' }}>🎨</div>
                      <h3 style={{ color: '#800000' }}>Our Mission</h3>
                      <p style={{ color: '#a52a2a' }}>
                        We are dedicated to preserving and promoting traditional weaving techniques while
                        supporting our artisan community. Through education, cultural exchange, and sustainable
                        practices, we ensure these beautiful traditions continue to thrive.
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <div className="text-center">
                      <div className="fs-1 mb-3" style={{ color: '#daa520' }}>🌱</div>
                      <h3 style={{ color: '#800000' }}>Our Commitment</h3>
                      <p style={{ color: '#a52a2a' }}>
                        We believe in fair trade, environmental sustainability, and cultural preservation.
                        Every purchase supports our artisans and helps maintain the delicate balance
                        between tradition and innovation in our weaving community.
                      </p>
                      <Button as={Link} to="/products" variant="primary" size="lg" className="mt-3" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                        Explore Our Products
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
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

export default About;