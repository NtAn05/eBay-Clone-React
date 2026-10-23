import React, { useState } from 'react';
import { Modal, Tab, Tabs, Form, Button, Alert, Badge } from 'react-bootstrap';
import { LogIn, UserPlus, ShieldCheck, Mail, Lock, User, Phone, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, onShowToast }) {
  const { login, register, switchRoleDemo } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('buyer');

  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }

    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      onShowToast?.({
        show: true,
        type: 'success',
        title: 'Đăng nhập thành công',
        message: `Chào mừng trở lại, ${res.user.name} (${res.user.role.toUpperCase()})!`
      });
      onClose();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Vui lòng điền đầy đủ các thông tin bắt buộc (*)!');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Mật khẩu phải có tối thiểu 6 ký tự!');
      return;
    }

    const res = register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      role: regRole
    });

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      onShowToast?.({
        show: true,
        type: 'success',
        title: 'Đăng ký thành công',
        message: `Tài khoản ${res.user.email} đã được tạo với vai trò ${res.user.role.toUpperCase()}!`
      });
      onClose();
    }
  };

  const handleQuickDemoLogin = (role) => {
    switchRoleDemo(role);
    onShowToast?.({
      show: true,
      type: 'success',
      title: 'Chuyển vai trò Demo thành công',
      message: `Đang đăng nhập với vai trò: ${role.toUpperCase()}`
    });
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2 fs-5">
          <ShieldCheck className="text-primary" size={24} />
          Xác thực tài khoản người dùng
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2 px-4 pb-4">
        {errorMsg && (
          <Alert variant="danger" className="py-2 small" dismissible onClose={() => setErrorMsg('')}>
            {errorMsg}
          </Alert>
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => {
            setActiveTab(k);
            setErrorMsg('');
          }}
          className="mb-3 nav-fill border-bottom"
        >
          {/* TAB 1: LOGIN */}
          <Tab 
            eventKey="login" 
            title={
              <span className="d-flex align-items-center justify-content-center gap-2 fw-semibold">
                <LogIn size={16} /> Đăng nhập
              </span>
            }
          >
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">Địa chỉ Email</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <Mail size={16} />
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Label className="small fw-semibold text-secondary">Mật khẩu</Form.Label>
                  <span className="text-primary small cursor-pointer" style={{ fontSize: '0.8rem' }}>
                    Quên mật khẩu?
                  </span>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <Lock size={16} />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 fw-semibold py-2 shadow-sm">
                Đăng nhập ngay
              </Button>
            </Form>
          </Tab>

          {/* TAB 2: REGISTER */}
          <Tab 
            eventKey="register" 
            title={
              <span className="d-flex align-items-center justify-content-center gap-2 fw-semibold">
                <UserPlus size={16} /> Đăng ký
              </span>
            }
          >
            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group className="mb-2">
                <Form.Label className="small fw-semibold text-secondary">Họ và tên *</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted"><User size={16} /></span>
                  <Form.Control
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-semibold text-secondary">Email liên hệ *</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted"><Mail size={16} /></span>
                  <Form.Control
                    type="email"
                    placeholder="user@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-semibold text-secondary">Số điện thoại</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted"><Phone size={16} /></span>
                  <Form.Control
                    type="tel"
                    placeholder="09xxxxxxxx"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-semibold text-secondary">Mật khẩu khởi tạo * (≥ 6 ký tự)</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted"><Lock size={16} /></span>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">Mục đích sử dụng chính</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    id="role-buyer"
                    label="Người mua (Đấu giá & Mua sắm)"
                    name="registerRole"
                    checked={regRole === 'buyer'}
                    onChange={() => setRegRole('buyer')}
                    className="small"
                  />
                  <Form.Check
                    type="radio"
                    id="role-seller"
                    label="Người bán (Mở gian hàng)"
                    name="registerRole"
                    checked={regRole === 'seller'}
                    onChange={() => setRegRole('seller')}
                    className="small"
                  />
                </div>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 fw-semibold py-2 shadow-sm">
                Tạo tài khoản mới
              </Button>
            </Form>
          </Tab>
        </Tabs>

        {/* FAST 1-CLICK DEMO LOGIN (FOR GRADING & PRESENTATION) */}
        <div className="mt-4 pt-3 border-top bg-light p-3 rounded">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-bold text-dark text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
              ⚡ Đăng nhập nhanh tài khoản mẫu (Demo Roles)
            </span>
            <Badge bg="info" className="text-dark">Phục vụ kiểm thử</Badge>
          </div>
          
          <div className="d-grid gap-2">
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="text-start d-flex justify-content-between align-items-center py-1 px-2"
              onClick={() => handleQuickDemoLogin('buyer')}
            >
              <span><strong>Buyer:</strong> Nguyễn Văn Mua (buyer@demo.com)</span>
              <Badge bg="primary">Người mua</Badge>
            </Button>

            <Button 
              variant="outline-success" 
              size="sm" 
              className="text-start d-flex justify-content-between align-items-center py-1 px-2"
              onClick={() => handleQuickDemoLogin('seller')}
            >
              <span><strong>Seller:</strong> Trần Thị Bán (seller@demo.com)</span>
              <Badge bg="success">Người bán</Badge>
            </Button>

            <Button 
              variant="outline-dark" 
              size="sm" 
              className="text-start d-flex justify-content-between align-items-center py-1 px-2"
              onClick={() => handleQuickDemoLogin('admin')}
            >
              <span><strong>Admin:</strong> Lê Quản Trị (admin@demo.com)</span>
              <Badge bg="dark">Quản trị viên</Badge>
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
