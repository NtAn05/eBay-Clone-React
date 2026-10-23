import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Lock, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-light border-top text-secondary mt-5 py-5" style={{ fontSize: '0.8rem' }}>
      <Container>
        <Row className="g-4 mb-4 border-bottom pb-4">
          <Col xs={6} md={3}>
            <h6 className="fw-bold text-dark text-uppercase style-xs mb-3" style={{ fontSize: '0.78rem' }}>Bán Hàng Trên eAuction</h6>
            <ul className="list-unstyled space-y-1">
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Bắt đầu bán hàng</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Hướng dẫn đấu giá</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Phí người bán & hoa hồng</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Cửa hàng doanh nghiệp</a></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="fw-bold text-dark text-uppercase style-xs mb-3" style={{ fontSize: '0.78rem' }}>Mua Sắm & Đấu Giá</h6>
            <ul className="list-unstyled space-y-1">
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Bảo đảm hoàn tiền 100%</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Đấu giá sắp kết thúc</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">eBay Vault & Authentic</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Thẻ quà tặng (Gift Cards)</a></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="fw-bold text-dark text-uppercase style-xs mb-3" style={{ fontSize: '0.78rem' }}>Trợ Giúp & An Toàn</h6>
            <ul className="list-unstyled space-y-1">
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Trung tâm hỗ trợ</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Bảo mật tài khoản</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Báo cáo vi phạm</a></li>
              <li><a href="#" className="text-secondary text-decoration-none hover-primary">Quy định đấu giá</a></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="fw-bold text-dark text-uppercase style-xs mb-3" style={{ fontSize: '0.78rem' }}>Bảo Mật & Giao Hàng</h6>
            <div className="d-flex flex-column gap-2">
              <div className="bg-white p-2 border rounded d-flex align-items-center gap-2 text-success fw-semibold">
                <Lock size={15} />
                <span>Mã hóa SSL 256-bit</span>
              </div>
              <div className="bg-white p-2 border rounded d-flex align-items-center gap-2 text-primary fw-semibold">
                <Globe size={15} />
                <span>Giao 190+ quốc gia</span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-muted">
          <div>
            Bản quyền &copy; 1995-2026 eAuction Inc. Tất cả quyền được bảo lưu. Giao diện React Bootstrap lấy cảm hứng từ eBay.com.
          </div>
          <div className="d-flex gap-3">
            <a href="#" className="text-muted text-decoration-none">Điều khoản</a>
            <a href="#" className="text-muted text-decoration-none">Bảo mật</a>
            <a href="#" className="text-muted text-decoration-none">Sơ đồ trang</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
