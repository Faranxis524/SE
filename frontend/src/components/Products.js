import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Products = ({ products }) => {
  return (
    <div>
      <Container fluid className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4" style={{ color: '#800000' }}>Our Products</h1>
              <div className="fs-1 mb-4" style={{ color: '#daa520' }}>🛍️</div>
            </div>
            <Row>
              {products.map(product => (
                <Col md={6} lg={4} className="mb-4" key={product.id}>
                  <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                    <Card.Body>
                      <Card.Title style={{ color: '#800000' }}>{product.name}</Card.Title>
                      <Card.Text style={{ color: '#a52a2a' }}>{product.description}</Card.Text>
                      {product.image && (
                        <Card.Img variant="top" src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.name} className="img-fluid mb-3 rounded" style={{ border: '2px solid #daa520' }} onError={(e) => { e.target.src = '/placeholder-image.png'; e.target.alt = 'Image not available'; }} />
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 d-flex justify-content-center">
                      <Button as="a" href={product.shopee_link} target="_blank" rel="noopener noreferrer" variant="primary" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                        Buy this product
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

export default Products;