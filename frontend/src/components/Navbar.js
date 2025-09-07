import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogin = () => {
    const password = prompt('Enter admin password:');
    if (password === 'password') {
      navigate('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #800000 0%, #a52a2a 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '3px solid #daa520'
      }}
    >
      <Container fluid>
        <Navbar.Brand
          onClick={() => scrollToSection('home')}
          className="fw-bold fs-4 d-flex align-items-center"
          style={{
            color: '#f5f5dc',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            cursor: 'pointer'
          }}
        >
          <span className="me-2" style={{ fontSize: '1.5rem' }}>🧵</span>
          Cordillera Indigenous Weaving
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ borderColor: '#f5f5dc' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              onClick={() => scrollToSection('home')}
              className="mx-2 fw-semibold"
              style={{
                color: '#f5f5dc',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                position: 'relative',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🏠 Home
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection('products')}
              className="mx-2 fw-semibold"
              style={{
                color: '#f5f5dc',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🛍️ Products
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection('storytelling')}
              className="mx-2 fw-semibold"
              style={{
                color: '#f5f5dc',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📖 Digital Storytelling
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection('campaigns')}
              className="mx-2 fw-semibold"
              style={{
                color: '#f5f5dc',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              💝 Campaigns
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection('gallery')}
              className="mx-2 fw-semibold"
              style={{
                color: '#f5f5dc',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🖼️ Gallery
            </Nav.Link>

            <Nav.Link
              onClick={() => scrollToSection('about')}
              className="mx-2 fw-semibold"
              style={{
                color: '#f5f5dc',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              ℹ️ About
            </Nav.Link>
          </Nav>

          <Button
            onClick={handleAdminLogin}
            className="ms-3 fw-bold"
            style={{
              background: 'linear-gradient(135deg, #daa520 0%, #ffd700 100%)',
              border: '2px solid #f5f5dc',
              color: '#800000',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
          >
            🔐 Admin Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;