import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button, Card, Form, Alert } from 'react-bootstrap';

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({ title: '', url: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    axios.get('http://127.0.0.1:8000/api/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://127.0.0.1:8000/api/videos/${editingId}`, formData)
        .then(() => {
          fetchVideos();
          setFormData({ title: '', url: '', description: '' });
          setEditingId(null);
          setAlertMessage('Video updated successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error updating video:', error);
          setAlertMessage('Error updating video. Please try again.');
          setShowAlert(true);
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/videos', formData)
        .then(() => {
          fetchVideos();
          setFormData({ title: '', url: '', description: '' });
          setAlertMessage('Video added successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error adding video:', error);
          setAlertMessage('Error adding video. Please try again.');
          setShowAlert(true);
        });
    }
  };

  const handleEdit = (video) => {
    setFormData({ title: video.title, url: video.url, description: video.description });
    setEditingId(video.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      axios.delete(`http://127.0.0.1:8000/api/videos/${id}`)
        .then(() => {
          fetchVideos();
          setAlertMessage('Video deleted successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error deleting video:', error);
          setAlertMessage('Error deleting video. Please try again.');
          setShowAlert(true);
        });
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
        <Container fluid>
          <Navbar.Brand href="#home" className="fs-3">Admin - Manage Videos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin" style={{ color: '#f5f5dc' }}>Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/admin/videos" style={{ color: '#f5f5dc' }}>Manage Videos</Nav.Link>
              <Nav.Link as={Link} to="/admin/blogs" style={{ color: '#f5f5dc' }}>Manage Blogs</Nav.Link>
              <Nav.Link as={Link} to="/admin/products" style={{ color: '#f5f5dc' }}>Manage Products</Nav.Link>
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
                  {editingId ? 'Edit Video' : 'Add New Video'}
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Video Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter video title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>YouTube URL</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter YouTube URL"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#800000' }}>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter video description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center gap-3">
                    <Button type="submit" variant="primary" size="lg" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      {editingId ? 'Update Video' : 'Add Video'}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="secondary" size="lg" onClick={() => { setEditingId(null); setFormData({ title: '', url: '', description: '' }); }} style={{ background: '#daa520', border: 'none', color: '#800000' }}>
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
            <h3 className="text-center mb-4" style={{ color: '#800000' }}>Existing Videos</h3>
            <Row>
              {videos.map(video => (
                <Col md={6} lg={4} className="mb-4" key={video.id}>
                  <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                    <Card.Body>
                      <Card.Title style={{ color: '#800000' }}>{video.title}</Card.Title>
                      <Card.Text style={{ color: '#a52a2a' }}>{video.description}</Card.Text>
                      <Card.Text style={{ color: '#a52a2a', fontSize: '0.9rem' }}>
                        <small>URL: {video.url}</small>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 d-flex justify-content-center gap-2">
                      <Button variant="warning" onClick={() => handleEdit(video)} style={{ background: '#daa520', border: 'none', color: '#800000' }}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(video.id)} style={{ background: '#800000', border: 'none' }}>
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

export default ManageVideos;