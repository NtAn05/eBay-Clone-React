import React from 'react';
import { 
  Navbar, 
  Nav, 
  Container, 
  Form, 
  InputGroup, 
  Button, 
  Badge, 
  Dropdown 
} from 'react-bootstrap';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  PlusCircle, 
  ShieldCheck, 
  Tag, 
  Flame,
  Store,
  ShieldAlert,
  LogOut,
  Settings
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useAuth } from '../context/AuthContext';

export default function Header({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  watchlistCount,
  cartCount,
  onOpenWatchlist,
  onOpenCart,
  onOpenSellModal,
  onOpenAuthModal,
  onOpenProfile,
  onOpenSellerDashboard,
  onOpenAdminDashboard,
  activeFilterType,
  onFilterTypeChange,
  onShowToast
}) {
  const { currentUser, currentRole, isAuthenticated, logout } = useAuth();

  const handleSellClick = () => {
    if (!isAuthenticated) {
      onShowToast?.({
        show: true,
        type: 'error',
        title: 'Yêu cầu Đăng nhập',
        message: 'Bạn cần đăng nhập tài khoản Người bán để đăng sản phẩm đấu giá!'
      });
      onOpenAuthModal?.();
      return;
    }

    if (currentRole === 'buyer') {
      onShowToast?.({
        show: true,
        type: 'info',
        title: 'Quyền Người bán',
        message: 'Bạn đang dùng tài khoản Buyer. Vui lòng chuyển sang vai trò Seller ở thanh Switcher góc dưới để đăng bán!'
      });
      return;
    }

    onOpenSellModal?.();
  };

  const getRoleBadge = () => {
    if (currentRole === 'admin') return <Badge bg="dark" className="ms-1">Admin</Badge>;
    if (currentRole === 'seller') return <Badge bg="success" className="ms-1">Seller</Badge>;
    return <Badge bg="primary" className="ms-1">Buyer</Badge>;
  };

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-light border-bottom py-1 text-secondary" style={{ fontSize: '0.8rem' }}>
        <Container fluid="lg" className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            {!isAuthenticated ? (
              <span className="fw-medium text-dark">
                <User size={14} className="text-primary me-1" />
                Xin chào!{' '}
                <span 
                  className="text-primary cursor-pointer fw-bold text-decoration-underline"
                  onClick={onOpenAuthModal}
                >
                  Đăng nhập
                </span>{' '}
                hoặc{' '}
                <span 
                  className="cursor-pointer text-decoration-underline"
                  onClick={onOpenAuthModal}
                >
                  Đăng ký
                </span>
              </span>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Dropdown align="start">
                  <Dropdown.Toggle 
                    variant="link" 
                    className="p-0 text-dark fw-bold text-decoration-none d-flex align-items-center gap-1"
                    style={{ fontSize: '0.82rem' }}
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="rounded-circle border"
                      style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                    />
                    <span>{currentUser.name}</span>
                    {getRoleBadge()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow border-0 p-2" style={{ minWidth: '200px' }}>
                    <div className="px-2 py-1 mb-1 border-bottom">
                      <div className="fw-bold small">{currentUser.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>{currentUser.email}</div>
                    </div>

                    <Dropdown.Item onClick={onOpenProfile} className="rounded small py-1.5 d-flex align-items-center gap-2">
                      <User size={14} className="text-primary" /> Hồ sơ cá nhân
                    </Dropdown.Item>

                    {(currentRole === 'seller' || currentRole === 'admin') && (
                      <Dropdown.Item onClick={onOpenSellerDashboard} className="rounded small py-1.5 d-flex align-items-center gap-2">
                        <Store size={14} className="text-success" /> Kênh Người Bán
                      </Dropdown.Item>
                    )}

                    {currentRole === 'admin' && (
                      <Dropdown.Item onClick={onOpenAdminDashboard} className="rounded small py-1.5 d-flex align-items-center gap-2 text-danger fw-semibold">
                        <ShieldAlert size={14} /> Trang Quản trị Admin
                      </Dropdown.Item>
                    )}

                    <Dropdown.Divider />

                    <Dropdown.Item 
                      onClick={() => {
                        logout();
                        onShowToast?.({
                          show: true,
                          type: 'info',
                          title: 'Đã đăng xuất',
                          message: 'Hẹn gặp lại bạn lần sau!'
                        });
                      }} 
                      className="rounded small py-1.5 text-danger d-flex align-items-center gap-2"
                    >
                      <LogOut size={14} /> Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

            <span className="text-muted d-none d-sm-inline">|</span>
            <span 
              className="text-danger fw-bold d-none d-sm-flex align-items-center gap-1 cursor-pointer"
              onClick={() => onFilterTypeChange('auction')}
            >
              <Tag size={13} /> Daily Deals & Đấu Giá
            </span>
            <span className="text-muted d-none d-md-inline">|</span>
            <span className="text-success d-none d-lg-flex align-items-center gap-1">
              <ShieldCheck size={13} /> Trợ giúp & Bảo đảm eBay Authentic
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 fw-semibold">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={handleSellClick}
              className="d-flex align-items-center gap-1 py-0 px-2 text-decoration-none shadow-sm"
              style={{ fontSize: '0.78rem' }}
            >
              <PlusCircle size={14} />
              <span>Đăng bán / Đấu giá</span>
            </Button>

            <div 
              onClick={onOpenWatchlist}
              className="cursor-pointer d-flex align-items-center gap-1 hover-primary"
              title="Danh sách theo dõi"
            >
              <Heart size={15} className={watchlistCount > 0 ? "text-danger fill-danger" : ""} />
              <span className="d-none d-sm-inline">Theo dõi</span>
              {watchlistCount > 0 && (
                <Badge bg="danger" pill style={{ fontSize: '0.65rem' }}>
                  {watchlistCount}
                </Badge>
              )}
            </div>

            <div 
              onClick={onOpenCart}
              className="cursor-pointer d-flex align-items-center gap-1 hover-primary"
              title="Giỏ hàng"
            >
              <ShoppingCart size={16} />
              <span className="d-none d-sm-inline">Giỏ hàng</span>
              {cartCount > 0 && (
                <Badge bg="primary" pill style={{ fontSize: '0.65rem' }}>
                  {cartCount}
                </Badge>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* 2. MAIN BRAND & SEARCH BAR */}
      <Container fluid="lg" className="py-2.5">
        <div className="d-flex align-items-center justify-content-between gap-3">
          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <a href="#" className="ebay-logo me-2 text-decoration-none">
              <span className="e">e</span>
              <span className="b">B</span>
              <span className="a">a</span>
              <span className="y">y</span>
              <span className="badge bg-secondary text-white ms-1 align-middle" style={{ fontSize: '0.65rem' }}>
                Auction & Store
              </span>
            </a>

            {/* Shop by Category Dropdown */}
            <Dropdown className="d-none d-lg-block">
              <Dropdown.Toggle variant="light" size="sm" className="fw-semibold text-secondary border">
                Danh mục
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-lg border-0 p-2" style={{ minWidth: '220px' }}>
                <Dropdown.Header className="fw-bold text-uppercase">Tất cả danh mục</Dropdown.Header>
                {CATEGORIES.map(cat => (
                  <Dropdown.Item 
                    key={cat.id}
                    active={selectedCategory === cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className="rounded text-sm"
                  >
                    {cat.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Search Bar Input Group */}
          <div className="flex-grow-1 max-w-700">
            <InputGroup className="shadow-sm rounded-pill overflow-hidden border border-2 border-dark">
              <InputGroup.Text className="bg-white border-0 pe-1">
                <Search size={18} className="text-muted" />
              </InputGroup.Text>

              <Form.Control
                type="text"
                placeholder="Tìm kiếm máy ảnh, laptop, giày sneakers, xe mô hình..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border-0 shadow-none text-sm"
              />

              <Form.Select 
                value={selectedCategory} 
                onChange={(e) => onSelectCategory(e.target.value)}
                className="border-0 bg-light text-secondary d-none d-md-block"
                style={{ maxWidth: '180px', fontSize: '0.82rem' }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </Form.Select>

              <Button variant="primary" className="fw-bold px-4">
                Tìm kiếm
              </Button>
            </InputGroup>
          </div>
        </div>
      </Container>

      {/* 3. CATEGORY NAVIGATION SUB-BAR */}
      <div className="bg-white border-top py-1">
        <Container fluid="lg" className="d-flex align-items-center justify-content-between overflow-auto">
          <Nav className="flex-row gap-3 text-sm fw-medium">
            <Nav.Link 
              active={selectedCategory === 'all' && activeFilterType === 'all'}
              onClick={() => {
                onSelectCategory('all');
                onFilterTypeChange('all');
              }}
              className={`py-1 px-2 ${selectedCategory === 'all' && activeFilterType === 'all' ? 'fw-bold text-primary border-bottom border-2 border-primary' : 'text-dark'}`}
            >
              Trang Chủ
            </Nav.Link>

            <Nav.Link 
              active={activeFilterType === 'auction'}
              onClick={() => onFilterTypeChange(activeFilterType === 'auction' ? 'all' : 'auction')}
              className="py-1 px-2 text-danger fw-bold d-flex align-items-center gap-1"
            >
              <Flame size={14} className="pulse-badge" />
              <span>Đấu Giá Live</span>
            </Nav.Link>

            <Nav.Link 
              active={activeFilterType === 'buy_it_now'}
              onClick={() => onFilterTypeChange(activeFilterType === 'buy_it_now' ? 'all' : 'buy_it_now')}
              className="py-1 px-2 text-dark fw-bold"
            >
              Mua Ngay
            </Nav.Link>

            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <Nav.Link 
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`py-1 px-2 text-nowrap ${selectedCategory === cat.id ? 'fw-bold text-primary border-bottom border-2 border-primary' : 'text-secondary'}`}
              >
                {cat.name}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </div>
    </header>
  );
}
