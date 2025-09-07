import React, { useState, useEffect } from 'react';
import NavigationBar from './Navbar';
import axios from 'axios';
import { Container, Row, Col, Card, Ratio } from 'react-bootstrap';

const Storytelling = () => {
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchVideos();
    fetchBlogs();
  }, []);

  const fetchVideos = () => {
    axios.get('http://127.0.0.1:8000/api/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  };

  const fetchBlogs = () => {
    axios.get('http://127.0.0.1:8000/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div>
      <NavigationBar />

      <Container fluid className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4" style={{ color: '#800000' }}>YouTube Documentaries</h1>
              <div className="fs-1 mb-4" style={{ color: '#daa520' }}>📹</div>
            </div>
            <Row>
              {videos.map(video => (
                <Col lg={6} xl={4} className="mb-4" key={video.id}>
                  <Card className="h-100 border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
                    <Card.Body>
                      <Card.Title style={{ color: '#800000' }}>{video.title}</Card.Title>
                      <Card.Text style={{ color: '#a52a2a' }}>{video.description}</Card.Text>
                    </Card.Body>
                    <Ratio aspectRatio="16x9">
                      <iframe
                        src={getYouTubeEmbedUrl(video.url)}
                        title={video.title}
                        allowFullScreen
                        className="rounded"
                      />
                    </Ratio>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(245, 245, 220, 0.9) 0%, rgba(255, 248, 220, 0.8) 100%)', border: '2px solid #daa520' }}>
              <Card.Body className="py-5">
                <div className="text-center mb-4">
                  <h2 style={{ color: '#800000' }}>Blogs</h2>
                  <div className="fs-1" style={{ color: '#daa520' }}>📝</div>
                </div>
                <Row>
                  {blogs.map(blog => (
                    <Col md={6} lg={4} className="mb-4" key={blog.id}>
                      <Card className="h-100 border-0" style={{ background: '#f5f5dc', border: '2px solid #daa520' }}>
                        <Card.Body>
                          <Card.Title style={{ color: '#800000' }}>{blog.title}</Card.Title>
                          <Card.Text style={{ color: '#a52a2a', fontStyle: 'italic' }}>By: {blog.author}</Card.Text>
                          <Card.Text style={{ color: '#a52a2a' }}>{blog.content}</Card.Text>
                        </Card.Body>
                        {blog.image && (
                          <Card.Img variant="bottom" src={blog.image} alt={blog.title} className="img-fluid rounded-bottom" style={{ borderTop: '2px solid #daa520' }} />
                        )}
                      </Card>
                    </Col>
                  ))}
                </Row>
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

export default Storytelling;