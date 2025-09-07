import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button, Card, Form, Alert } from 'react-bootstrap';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', author: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get('http://127.0.0.1:8000/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://127.0.0.1:8000/api/blogs/${editingId}`, formData)
        .then(() => {
          fetchBlogs();
          setFormData({ title: '', content: '', author: '', image: '' });
          setEditingId(null);
          setAlertMessage('Blog updated successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error updating blog:', error);
          setAlertMessage('Error updating blog. Please try again.');
          setShowAlert(true);
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/blogs', formData)
        .then(() => {
          fetchBlogs();
          setFormData({ title: '', content: '', author: '', image: '' });
          setAlertMessage('Blog added successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error adding blog:', error);
          setAlertMessage('Error adding blog. Please try again.');
          setShowAlert(true);
        });
    }
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content, author: blog.author, image: blog.image });
    setEditingId(blog.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axios.delete(`http://127.0.0.1:8000/api/blogs/${id}`)
        .then(() => {
          fetchBlogs();
          setAlertMessage('Blog deleted successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error deleting blog:', error);
          setAlertMessage('Error deleting blog. Please try again.');
          setShowAlert(true);
        });
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
        <Container fluid>
          <Navbar.Brand href="#home" className="fs-3">Admin - Manage Blogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/admin/videos">Manage Videos</Nav.Link>
              <Nav.Link as={Link} to="/admin/blogs">Manage Blogs</Nav.Link>
              <Nav.Link as={Link} to="/admin/products">Manage Products</Nav.Link>
              <Nav.Link as={Link} to="/">Back to Site</Nav.Link>
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
                  {editingId ? 'Edit Blog' : 'Add New Blog'}
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Blog Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter blog title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Author</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter author name"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Enter blog content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#800000' }}>Image URL (optional)</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center gap-3">
                    <Button type="submit" variant="primary" size="lg" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      {editingId ? 'Update Blog' : 'Add Blog'}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="secondary" size="lg" onClick={() => { setEditingId(null); setFormData({ title: '', content: '', author: '', image: '' }); }} style={{ background: '#daa520', border: 'none', color: '#800000' }}>
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
            <h3 className="text-center mb-4" style={{ color: '#800000' }}>Existing Blogs</h3>
            <Row>
              {blogs.map(blog => (
                <Col md={6} lg={4} className="mb-4" key={blog.id}>
                  <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                    <Card.Body>
                      <Card.Title style={{ color: '#800000' }}>{blog.title}</Card.Title>
                      <Card.Text style={{ color: '#a52a2a', fontStyle: 'italic' }}>By: {blog.author}</Card.Text>
                      <Card.Text style={{ color: '#a52a2a' }}>{blog.content.substring(0, 100)}...</Card.Text>
                      {blog.image && (
                        <Card.Img variant="top" src={blog.image} alt={blog.title} className="img-fluid mb-3 rounded" style={{ border: '2px solid #daa520' }} />
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 d-flex justify-content-center gap-2">
                      <Button variant="warning" onClick={() => handleEdit(blog)} style={{ background: '#daa520', border: 'none', color: '#800000' }}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(blog.id)} style={{ background: '#800000', border: 'none' }}>
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

      <footer className="bg-dark text-light text-center py-4 mt-5">
        <Container>
          <p className="mb-0">&copy; 2023 Cordillera Indigenous Weaving Admin</p>
        </Container>
      </footer>
    </div>
  );
};

export default ManageBlogs;