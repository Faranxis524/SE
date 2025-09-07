import React from 'react';
import { Container, Row, Col, Card, Ratio } from 'react-bootstrap';

const Storytelling = ({ videos, blogs }) => {
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';

    // Handle different YouTube URL formats
    let videoId = '';

    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0]?.split('&')[0];
    }

    if (!videoId) {
      console.warn('Could not extract video ID from URL:', url);
      return '';
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
    console.log('YouTube embed URL:', embedUrl);
    return embedUrl;
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleBlogClick = (blogUrl) => {
    if (blogUrl) {
      window.open(blogUrl, '_blank');
    }
  };

  return (
    <div>
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
                      {getYouTubeEmbedUrl(video.url) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(video.url)}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          className="rounded"
                          style={{ border: 'none', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center bg-dark text-white rounded"
                          style={{ width: '100%', height: '100%' }}
                        >
                          <div className="text-center">
                            <div className="fs-1 mb-2">🎥</div>
                            <p className="mb-2">Video Unavailable</p>
                            <small>Invalid YouTube URL</small>
                          </div>
                        </div>
                      )}
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
                      <Card
                        className="h-100 border-0"
                        style={{
                          background: '#f5f5dc',
                          border: '2px solid #daa520',
                          cursor: blog.blog_url ? 'pointer' : 'default',
                          transition: 'transform 0.2s'
                        }}
                        onClick={() => handleBlogClick(blog.blog_url)}
                        onMouseEnter={(e) => {
                          if (blog.blog_url) {
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (blog.blog_url) {
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      >
                        <Card.Body>
                          <Card.Title style={{ color: '#800000' }}>{blog.title}</Card.Title>
                          <Card.Text style={{ color: '#a52a2a', fontStyle: 'italic' }}>By: {blog.author}</Card.Text>
                          <Card.Text style={{ color: '#a52a2a' }}>
                            {truncateContent(blog.content)}
                            {blog.content.length > 150 && (
                              <span style={{ color: '#daa520', fontWeight: 'bold', marginLeft: '5px' }}>
                                {blog.blog_url ? 'Read More' : ''}
                              </span>
                            )}
                          </Card.Text>
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
    </div>
  );
};

export default Storytelling;