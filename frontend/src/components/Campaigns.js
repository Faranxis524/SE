import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Fundraising = () => {
  const [customAmount, setCustomAmount] = useState('');

  const handleDonate = (amount) => {
    alert(`Thank you for donating $${amount}! Redirecting to PayPal...`);
  };

  const handleCustomDonate = (e) => {
    e.preventDefault();
    if (customAmount && parseFloat(customAmount) > 0) {
      handleDonate(customAmount);
      setCustomAmount('');
    } else {
      alert('Please enter a valid amount');
    }
  };

  return (
    <div>
      <Container fluid className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4" style={{ color: '#800000' }}>Support Our Cause</h1>
              <div className="fs-1 mb-4" style={{ color: '#daa520' }}>💝</div>
              <p className="lead mb-4" style={{ color: '#a52a2a' }}>
                Help preserve the indigenous weaving traditions by donating to our fundraising campaign.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-1 mb-3">💰</div>
                <Card.Title style={{ color: '#800000' }}>Quick Donate</Card.Title>
                <Card.Text style={{ color: '#a52a2a' }}>Choose from our preset amounts</Card.Text>
                <div className="d-flex flex-column gap-2">
                  <Button variant="primary" onClick={() => handleDonate(10)} style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                    Donate $10
                  </Button>
                  <Button variant="primary" onClick={() => handleDonate(25)} style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                    Donate $25
                  </Button>
                  <Button variant="primary" onClick={() => handleDonate(50)} style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                    Donate $50
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-1 mb-3">🎁</div>
                <Card.Title style={{ color: '#800000' }}>Custom Amount</Card.Title>
                <Card.Text style={{ color: '#a52a2a' }}>Enter your own donation amount</Card.Text>
                <Form onSubmit={handleCustomDonate}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="1"
                      step="0.01"
                      required
                      style={{ background: '#f5f5dc', border: '2px solid #daa520', color: '#800000' }}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" style={{ background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)', border: 'none' }}>
                    Donate Custom Amount
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-1 mb-3">🤝</div>
                <Card.Title style={{ color: '#800000' }}>Partner With Us</Card.Title>
                <Card.Text style={{ color: '#a52a2a' }}>Become a corporate sponsor or partner</Card.Text>
                <Button variant="outline-primary" style={{ borderColor: '#daa520', color: '#800000' }}>
                  Contact Us
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Fundraising;