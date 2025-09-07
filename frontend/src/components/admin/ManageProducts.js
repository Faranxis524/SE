import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button, Card, Form, Alert } from 'react-bootstrap';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', shopee_link: '', image: null });
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('shopee_link', formData.shopee_link);
    data.append('_method', editingId ? 'PUT' : 'POST'); // Method spoofing for Laravel
    if (formData.image) {
      data.append('image', formData.image);
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    if (editingId) {
      axios.post(`http://127.0.0.1:8000/api/products/${editingId}`, data, config)
        .then((response) => {
          console.log('Product updated:', response.data);
          fetchProducts();
          setFormData({ name: '', description: '', shopee_link: '', image: null });
          setEditingId(null);
          setAlertMessage('Product updated successfully!');
          setShowAlert(true);
          // Clear file input
          const fileInput = document.querySelector('input[type="file"]');
          if (fileInput) fileInput.value = '';
        })
        .catch(error => {
          console.error('Error updating product:', error);
          setAlertMessage('Error updating product. Please try again.');
          setShowAlert(true);
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/products', data, config)
        .then((response) => {
          console.log('Product created:', response.data);
          fetchProducts();
          setFormData({ name: '', description: '', shopee_link: '', image: null });
          setAlertMessage('Product added successfully!');
          setShowAlert(true);
          // Clear file input
          const fileInput = document.querySelector('input[type="file"]');
          if (fileInput) fileInput.value = '';
        })
        .catch(error => {
          console.error('Error adding product:', error);
          setAlertMessage('Error adding product. Please try again.');
          setShowAlert(true);
        });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      shopee_link: product.shopee_link,
      image: null // Keep as null for file input, existing image will be preserved
    });
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
        .then(() => {
          fetchProducts();
          setAlertMessage('Product deleted successfully!');
          setShowAlert(true);
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          setAlertMessage('Error deleting product. Please try again.');
          setShowAlert(true);
        });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
        <Container fluid>
          <Navbar.Brand href="#home" className="fs-3">Admin - Manage Products</Navbar.Brand>
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
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter product description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#800000' }}>Shopee Link</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter Shopee link"
                      value={formData.shopee_link}
                      onChange={(e) => setFormData({ ...formData, shopee_link: e.target.value })}
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#800000' }}>Product Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center gap-3">
                    <Button type="submit" variant="primary" size="lg" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                      {editingId ? 'Update Product' : 'Add Product'}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="secondary" size="lg" onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', description: '', shopee_link: '', image: null });
                        // Clear file input
                        const fileInput = document.querySelector('input[type="file"]');
                        if (fileInput) fileInput.value = '';
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
            <h3 className="text-center mb-4" style={{ color: '#800000' }}>Existing Products</h3>
            <Row>
              {products.map(product => (
                <Col md={6} lg={4} className="mb-4" key={product.id}>
                  <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                    <Card.Body>
                      <Card.Title style={{ color: '#800000' }}>{product.name}</Card.Title>
                      <Card.Text style={{ color: '#a52a2a' }}>{product.description}</Card.Text>
                      <Card.Text style={{ color: '#a52a2a', fontSize: '0.9rem' }}>
                        <small>Link: <a href={product.shopee_link} target="_blank" rel="noopener noreferrer" style={{ color: '#800000' }}>{product.shopee_link}</a></small>
                      </Card.Text>
                      {product.image && (
                        <Card.Img variant="top" src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.name} className="img-fluid mb-3 rounded" style={{ border: '2px solid #daa520' }} onError={(e) => { e.target.src = '/placeholder-image.png'; e.target.alt = 'Image not available'; }} />
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 d-flex justify-content-center gap-2">
                      <Button variant="warning" onClick={() => handleEdit(product)} style={{ background: '#daa520', border: 'none', color: '#800000' }}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(product.id)} style={{ background: '#800000', border: 'none' }}>
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

export default ManageProducts;