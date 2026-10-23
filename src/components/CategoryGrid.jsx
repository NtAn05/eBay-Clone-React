import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CATEGORIES } from '../data/categories';
import { 
  Grid, 
  Smartphone, 
  Shirt, 
  Award, 
  Car, 
  Home as HomeIcon, 
  Gamepad2, 
  Dumbbell 
} from 'lucide-react';

const ICON_MAP = {
  Grid,
  Smartphone,
  Shirt,
  Award,
  Car,
  Home: HomeIcon,
  Gamepad2,
  Dumbbell
};

export default function CategoryGrid({ selectedCategory, onSelectCategory }) {
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-0 text-dark">Khám Phá Theo Danh Mục</h4>
          <small className="text-muted">Tìm kiếm sản phẩm đấu giá và mua nhanh theo ngành hàng</small>
        </div>
        <span 
          onClick={() => onSelectCategory('all')} 
          className="text-primary fw-semibold text-xs cursor-pointer hover-underline"
        >
          Xem tất cả ({CATEGORIES.length}) &rarr;
        </span>
      </div>

      <Row xs={2} sm={4} lg={8} className="g-2">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Grid;
          const isSelected = selectedCategory === cat.id;

          return (
            <Col key={cat.id}>
              <Card
                onClick={() => onSelectCategory(cat.id)}
                className={`h-100 text-center border-0 shadow-sm cursor-pointer p-2 rounded-3 transition-all ${
                  isSelected ? 'bg-primary text-white shadow-md' : 'bg-white text-dark hover-light border'
                }`}
              >
                <Card.Body className="p-2 d-flex flex-column align-items-center justify-content-center">
                  <div className={`p-2 rounded-circle mb-2 ${isSelected ? 'bg-white bg-opacity-20 text-white' : 'bg-light text-primary'}`}>
                    <IconComponent size={20} />
                  </div>
                  <div className="fw-bold text-truncate w-100" style={{ fontSize: '0.78rem' }}>
                    {cat.name}
                  </div>
                  {cat.count && (
                    <small className={`mt-0.5 style-xs ${isSelected ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.68rem' }}>
                      {cat.count} SP
                    </small>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
