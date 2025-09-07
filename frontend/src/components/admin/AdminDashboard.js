import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const AdminDashboard = ({ onLogout }) => {

  return (
    <div>
      <Container fluid className="py-5" style={{ background: 'linear-gradient(135deg, #f5f5dc 0%, #fff 100%)', minHeight: '80vh' }}>
        <Row className="justify-content-center mb-4">
          <Col lg={10}>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-4" style={{ color: '#800000' }}>🛠️ Admin Dashboard</h1>
              <Button variant="outline-danger" onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  onLogout();
                }
              }}>
                🚪 Logout
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4" style={{ color: '#800000' }}>Welcome to Admin Panel</h1>
              <div className="fs-1 mb-4" style={{ color: '#daa520' }}>⚙️</div>
              <p className="lead mb-4" style={{ color: '#a52a2a' }}>
                Manage your website content, products, and user interactions from this central dashboard.
              </p>
            </div>

            <Row className="g-4">
              <Col md={6} lg={4}>
                <Card className="h-100 border-0 shadow-lg text-center" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <div className="fs-1 mb-3">📹</div>
                    <Card.Title style={{ color: '#800000' }}>Video Management</Card.Title>
                    <Card.Text style={{ color: '#a52a2a' }}>Add, edit, and manage YouTube video content</Card.Text>
                    <Button as={Link} to="/admin/videos" variant="primary" className="mt-auto" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      Manage Videos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4}>
                <Card className="h-100 border-0 shadow-lg text-center" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <div className="fs-1 mb-3">📝</div>
                    <Card.Title style={{ color: '#800000' }}>Blog Management</Card.Title>
                    <Card.Text style={{ color: '#a52a2a' }}>Create and edit blog posts and articles</Card.Text>
                    <Button as={Link} to="/admin/blogs" variant="primary" className="mt-auto" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      Manage Blogs
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4}>
                <Card className="h-100 border-0 shadow-lg text-center" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <div className="fs-1 mb-3">🛍️</div>
                    <Card.Title style={{ color: '#800000' }}>Product Management</Card.Title>
                    <Card.Text style={{ color: '#a52a2a' }}>Manage product listings and inventory</Card.Text>
                    <Button as={Link} to="/admin/products" variant="primary" className="mt-auto" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      Manage Products
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4}>
                <Card className="h-100 border-0 shadow-lg text-center" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <div className="fs-1 mb-3">🖼️</div>
                    <Card.Title style={{ color: '#800000' }}>Gallery Management</Card.Title>
                    <Card.Text style={{ color: '#a52a2a' }}>Upload and organize gallery images</Card.Text>
                    <Button as={Link} to="/admin/gallery" variant="primary" className="mt-auto" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      Manage Gallery
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;