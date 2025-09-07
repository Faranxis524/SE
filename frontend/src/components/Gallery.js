import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Gallery = ({ galleries }) => {
  return (
    <div>
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
            <Row>
              {galleries.map(image => (
                  <Col md={6} lg={4} className="mb-4" key={image.id}>
                    <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                      {image.image ? (
                        <Card.Img
                          variant="top"
                          src={image.image}
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
         </Col>
       </Row>
      </Container>
    </div>
  );
};

export default Gallery;