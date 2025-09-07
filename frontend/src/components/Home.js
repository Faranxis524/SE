import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './Navbar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <NavigationBar />

      <Container fluid className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={10} xl={8}>
            <div className="text-center mb-5" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', padding: '4rem 2rem', borderRadius: '15px', border: '3px solid #daa520' }}>
              <h1 className="display-4 mb-4" style={{ color: '#800000' }}>Preserving Tradition Through Art</h1>
              <p className="lead mb-4" style={{ color: '#a52a2a' }}>Explore the rich heritage of Cordillera indigenous weaving through our products, stories, campaigns, and gallery.</p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-1 mb-3">🧵</div>
                <Card.Title style={{ color: '#800000' }}>Traditional Weaving</Card.Title>
                <Card.Text style={{ color: '#a52a2a' }}>Authentic patterns passed down through generations</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-1 mb-3">🎨</div>
                <Card.Title style={{ color: '#800000' }}>Cultural Heritage</Card.Title>
                <Card.Text style={{ color: '#a52a2a' }}>Preserving the stories and traditions of our ancestors</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-1 mb-3">🌿</div>
                <Card.Title style={{ color: '#800000' }}>Sustainable Craft</Card.Title>
                <Card.Text style={{ color: '#a52a2a' }}>Eco-friendly materials and ethical production</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="text-center py-5">
                <Card.Title as="h2" className="mb-4" style={{ color: '#800000' }}>About Us</Card.Title>
                <Card.Text className="mb-4" style={{ color: '#a52a2a' }}>
                  Learn more about the Cordillera Indigenous Weaving community and our mission to preserve traditional crafts. Our artisans use age-old techniques to create beautiful textiles that tell the story of our culture.
                </Card.Text>
                <Button as={Link} to="/about" variant="primary" size="lg" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                  Learn More
                </Button>
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

export default Home;