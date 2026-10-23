import React from 'react';
import { Carousel, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { HERO_BANNERS } from '../data/categories';
import { ArrowRight, Flame, Clock } from 'lucide-react';

export default function HeroBanner({ onSelectAuctionFilter }) {
  return (
    <Container className="pt-3 pb-2">
      <Carousel controls indicators fade className="rounded-4 overflow-hidden shadow-sm">
        {HERO_BANNERS.map((banner) => (
          <Carousel.Item key={banner.id}>
            <div className="bg-dark text-white p-4 p-md-5" style={{ minHeight: '280px' }}>
              <Row className="align-items-center">
                <Col md={7} className="mb-3 mb-md-0">
                  <Badge bg="danger" className="mb-2 px-3 py-1 text-uppercase d-inline-flex align-items-center gap-1">
                    <Flame size={14} className="pulse-badge" />
                    <span>{banner.badge}</span>
                  </Badge>

                  <h2 className="display-6 fw-extrabold mb-2 text-white">
                    {banner.title}
                  </h2>

                  <p className="lead text-light mb-4" style={{ fontSize: '1rem' }}>
                    {banner.subtitle}
                  </p>

                  <div className="d-flex align-items-center gap-3">
                    <Button 
                      variant="warning" 
                      size="lg"
                      onClick={onSelectAuctionFilter}
                      className="fw-bold px-4 py-2 text-dark rounded-pill d-flex align-items-center gap-2 shadow-sm"
                    >
                      <span>{banner.cta}</span>
                      <ArrowRight size={18} />
                    </Button>

                    <div className="d-none d-sm-flex align-items-center gap-1 text-warning text-xs bg-black bg-opacity-50 px-3 py-2 rounded-pill border border-secondary">
                      <Clock size={14} />
                      <span>Cập nhật đấu giá 10s/lần</span>
                    </div>
                  </div>
                </Col>

                <Col md={5} className="text-center">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="img-fluid rounded-3 shadow-lg"
                    style={{ maxHeight: '240px', objectFit: 'cover', width: '100%' }}
                  />
                </Col>
              </Row>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
