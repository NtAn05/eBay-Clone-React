import React, { useState } from 'react';
import { Modal, Tab, Tabs, Form, Button, Badge, Table, Alert } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Wallet, Shield, Clock, PackageCheck, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserProfileModal({ isOpen, onClose, onShowToast }) {
  const { currentUser, updateProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!currentUser) return null;

  const handleSaveInfo = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    setSuccessMsg('Đã cập nhật thông tin hồ sơ thành công!');
    onShowToast?.({
      show: true,
      type: 'success',
      title: 'Hồ sơ đã cập nhật',
      message: 'Thông tin cá nhân của bạn đã được lưu.'
    });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Mật khẩu mới phải từ 6 ký tự trở lên!');
      return;
    }
    updateProfile({ password: newPassword });
    setSuccessMsg('Đã đổi mật khẩu thành công!');
    setOldPassword('');
    setNewPassword('');
    onShowToast?.({
      show: true,
      type: 'success',
      title: 'Đổi mật khẩu thành công',
      message: 'Mật khẩu mới đã được kích hoạt cho tài khoản.'
    });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Mock bid history
  const mockBids = [
    {
      id: 'bid-1',
      title: 'Apple MacBook Pro 16" M3 Max',
      bidAmount: 2150.00,
      myBid: 2150.00,
      status: 'winning', // 'winning', 'outbid', 'won'
      time: '10 phút trước'
    },
    {
      id: 'bid-2',
      title: 'Giày Nike Air Jordan 1 Retro High OG "Chicago"',
      bidAmount: 380.00,
      myBid: 350.00,
      status: 'outbid',
      time: '2 giờ trước'
    }
  ];

  // Mock orders
  const mockOrders = [
    {
      id: 'ORD-8921',
      date: '15/10/2026',
      items: 'Đàn Guitar Điện Fender Custom Shop 1960',
      total: 3450.00,
      status: 'Đang vận chuyển',
      paymentMethod: 'Chuyển khoản QR'
    }
  ];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return <Badge bg="dark">Quản trị viên (Admin)</Badge>;
      case 'seller': return <Badge bg="success">Người bán (Seller)</Badge>;
      default: return <Badge bg="primary">Thành viên (Buyer)</Badge>;
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2 fs-5">
          <User className="text-primary" size={22} />
          Trung tâm Quản lý Tài khoản cá nhân
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* TOP PROFILE BANNER */}
        <div className="d-flex flex-column flex-sm-row align-items-center gap-3 p-3 bg-light rounded-3 mb-4 border">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="rounded-circle border border-3 border-white shadow-sm"
            style={{ width: '70px', height: '70px', objectFit: 'cover' }}
          />
          <div className="flex-grow-1 text-center text-sm-start">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-2">
              <h5 className="mb-0 fw-bold text-dark">{currentUser.name}</h5>
              {getRoleBadge(currentUser.role)}
              <Badge bg={currentUser.status === 'active' ? 'success' : 'danger'} pill>
                {currentUser.status === 'active' ? '● Hoạt động' : '✖ Đã khóa'}
              </Badge>
            </div>
            <div className="text-muted small mt-1 d-flex flex-wrap gap-3 justify-content-center justify-content-sm-start">
              <span><Mail size={13} className="me-1" />{currentUser.email}</span>
              <span><Phone size={13} className="me-1" />{currentUser.phone}</span>
              <span><Clock size={13} className="me-1" />Gia nhập: {currentUser.joinedDate}</span>
            </div>
          </div>
          <div className="bg-white p-2 rounded border text-center shadow-sm">
            <span className="text-muted small d-block">Số dư ví đấu giá</span>
            <strong className="text-success fs-6">
              <Wallet size={15} className="me-1 inline" />
              ${currentUser.walletBalance?.toLocaleString()} USD
            </strong>
          </div>
        </div>

        {successMsg && (
          <Alert variant="success" className="py-2 small" dismissible onClose={() => setSuccessMsg('')}>
            {successMsg}
          </Alert>
        )}

        {/* TABS CONTENT */}
        <Tabs defaultActiveKey="info" className="mb-3">
          {/* TAB 1: EDIT INFO */}
          <Tab eventKey="info" title={<span className="fw-semibold"><User size={15} className="me-1" />Thông tin cá nhân</span>}>
            <Form onSubmit={handleSaveInfo} className="pt-2">
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary">Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary">Địa chỉ Email (Cố định)</Form.Label>
                    <Form.Control
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="bg-light"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary">Số điện thoại</Form.Label>
                    <Form.Control
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="small fw-semibold text-secondary">Địa chỉ nhận hàng</Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="mt-3 text-end">
                <Button variant="primary" type="submit" size="sm" className="px-4 fw-semibold">
                  Lưu thay đổi
                </Button>
              </div>
            </Form>
          </Tab>

          {/* TAB 2: BID HISTORY */}
          <Tab eventKey="bids" title={<span className="fw-semibold"><Award size={15} className="me-1" />Lịch sử Đấu giá</span>}>
            <div className="pt-2">
              <Table responsive hover size="sm" className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá cao nhất</th>
                    <th>Giá của tôi</th>
                    <th>Trạng thái</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBids.map((b) => (
                    <tr key={b.id}>
                      <td className="fw-semibold">{b.title}</td>
                      <td className="text-primary fw-bold">${b.bidAmount.toLocaleString()}</td>
                      <td>${b.myBid.toLocaleString()}</td>
                      <td>
                        {b.status === 'winning' ? (
                          <Badge bg="success">Đang dẫn đầu</Badge>
                        ) : (
                          <Badge bg="danger">Bị vượt giá</Badge>
                        )}
                      </td>
                      <td className="text-muted small">{b.time}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>

          {/* TAB 3: ORDER HISTORY */}
          <Tab eventKey="orders" title={<span className="fw-semibold"><PackageCheck size={15} className="me-1" />Đơn hàng đã mua</span>}>
            <div className="pt-2">
              <Table responsive hover size="sm" className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Ngày đặt</th>
                    <th>Sản phẩm</th>
                    <th>Tổng tiền</th>
                    <th>Thanh toán</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="fw-bold text-primary">{o.id}</td>
                      <td>{o.date}</td>
                      <td>{o.items}</td>
                      <td className="fw-bold">${o.total.toLocaleString()}</td>
                      <td><Badge bg="light" className="text-dark border">{o.paymentMethod}</Badge></td>
                      <td><Badge bg="info">{o.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>

          {/* TAB 4: PASSWORD */}
          <Tab eventKey="security" title={<span className="fw-semibold"><Shield size={15} className="me-1" />Bảo mật & Đổi mật khẩu</span>}>
            <Form onSubmit={handleChangePassword} className="pt-2 col-md-8 mx-auto">
              <Form.Group className="mb-2">
                <Form.Label className="small fw-semibold text-secondary">Mật khẩu hiện tại</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">Mật khẩu mới (≥ 6 ký tự)</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="warning" type="submit" size="sm" className="w-100 fw-semibold text-dark">
                Cập nhật mật khẩu mới
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
