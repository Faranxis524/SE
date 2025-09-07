import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button, Card, Form, Alert } from 'react-bootstrap';

const ManageGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = () => {
    axios.get('http://127.0.0.1:8000/api/galleries')
      .then(response => setGalleries(response.data))
      .catch(error => console.error('Error fetching galleries:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
    };

    if (editingId) {
      axios.put(`http://127.0.0.1:8000/api/galleries/${editingId}`, data)
        .then((response) => {
          console.log('Gallery updated:', response.data);
          fetchGalleries();
          setFormData({ title: '', description: '', image: '' });
          setEditingId(null);
          setAlertMessage('Gallery image updated successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error updating gallery:', error);
          setAlertMessage('Error updating gallery image. Please try again.');
          setShowAlert(true);
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/galleries', data)
        .then((response) => {
          console.log('Gallery created:', response.data);
          fetchGalleries();
          setFormData({ title: '', description: '', image: '' });
          setAlertMessage('Gallery image added successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error adding gallery:', error);
          setAlertMessage('Error adding gallery image. Please try again.');
          setShowAlert(true);
        });
    }
  };

  const handleEdit = (gallery) => {
    setFormData({
      title: gallery.title,
      description: gallery.description,
      image: gallery.image || '' // Use existing image URL
    });
    setEditingId(gallery.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery image?')) {
      axios.delete(`http://127.0.0.1:8000/api/galleries/${id}`)
        .then(() => {
          fetchGalleries();
          setAlertMessage('Gallery image deleted successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error deleting gallery:', error);
          setAlertMessage('Error deleting gallery image. Please try again.');
          setShowAlert(true);
        });
    }
  };


  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
        <Container fluid>
          <Navbar.Brand href="#home" className="fs-3">Admin - Manage Gallery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin" style={{ color: '#f5f5dc' }}>Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/admin/videos" style={{ color: '#f5f5dc' }}>Manage Videos</Nav.Link>
              <Nav.Link as={Link} to="/admin/blogs" style={{ color: '#f5f5dc' }}>Manage Blogs</Nav.Link>
              <Nav.Link as={Link} to="/admin/products" style={{ color: '#f5f5dc' }}>Manage Products</Nav.Link>
              <Nav.Link as={Link} to="/admin/gallery" style={{ color: '#f5f5dc' }}>Manage Gallery</Nav.Link>
              <Nav.Link as={Link} to="/" style={{ color: '#f5f5dc' }}>Back to Site</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="py-5">
        {showAlert && (
          <Row className="justify-content-center mb-4">
            <Col md={8}>
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center mb-5">
          <Col lg={6}>
            <Card className="border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="p-4">
                <Card.Title as="h3" className="text-center mb-4" style={{ color: '#800000' }}>
                  {editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Image Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter image description (optional)"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#800000' }}>Image URL</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required={!editingId} // Required only for new images
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                    {editingId && (
                      <Form.Text className="text-muted" style={{ color: '#a52a2a' }}>
                        Leave empty to keep the current image
                      </Form.Text>
                    )}
                  </Form.Group>
                  <div className="d-flex justify-content-center gap-3">
                    <Button type="submit" variant="primary" size="lg" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      {editingId ? 'Update Image' : 'Add Image'}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="secondary" size="lg" onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', description: '', image: '' });
                      }} style={{ background: '#daa520', border: 'none', color: '#800000' }}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10}>
            <h3 className="text-center mb-4" style={{ color: '#800000' }}>Gallery Images</h3>
            <Row>
              {galleries.map(gallery => (
                <Col md={6} lg={4} className="mb-4" key={gallery.id}>
                  <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                    <Card.Body>
                      <Card.Title style={{ color: '#800000', fontSize: '1.1rem' }}>{gallery.title}</Card.Title>
                      {gallery.description && (
                        <Card.Text style={{ color: '#a52a2a', fontSize: '0.9rem' }}>{gallery.description}</Card.Text>
                      )}
                      {gallery.image && (
                        <Card.Img variant="top" src={gallery.image} alt={gallery.title} className="img-fluid mb-3 rounded" style={{ border: '2px solid #daa520', maxHeight: '200px', objectFit: 'cover' }} onError={(e) => { e.target.src = '/placeholder-image.png'; e.target.alt = 'Image not available'; }} />
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 d-flex justify-content-center gap-2">
                      <Button variant="warning" onClick={() => handleEdit(gallery)} style={{ background: '#daa520', border: 'none', color: '#800000' }}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(gallery.id)} style={{ background: '#800000', border: 'none' }}>
                        Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageGallery;