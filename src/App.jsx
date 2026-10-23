import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShieldCheck, UserCheck, Clock, GitPullRequest, Code2, CheckCircle2 } from 'lucide-react';

function MainApp() {
  const { currentUser, currentRole, isAuthenticated } = useAuth();
  
  // Navigation & Filter state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterType, setActiveFilterType] = useState('all');

  // Modals state (Member 1 responsibilities)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Global Toast state
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: 'info' });

  const showToast = (toastData) => {
    setToast({ show: true, ...toastData });
  };

  const handlePendingFeatureNotice = (moduleName, memberName, branchName) => {
    showToast({
      show: true,
      type: 'info',
      title: `Module đang phát triển: ${moduleName}`,
      message: `Tính năng này do ${memberName} phụ trách trên nhánh "${branchName}". Sẽ tích hợp sau khi duyệt Pull Request.`
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* 1. HEADER (Member 1 Module) */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        watchlistCount={0}
        cartCount={0}
        onOpenWatchlist={() => handlePendingFeatureNotice('Danh Sách Theo Dõi (Watchlist)', 'Thành viên 2', 'feature/catalog-bidding')}
        onOpenCart={() => handlePendingFeatureNotice('Giỏ Hàng (Cart Drawer)', 'Thành viên 3', 'feature/seller-cart')}
        onOpenSellModal={() => handlePendingFeatureNotice('Đăng Bán / Đấu Giá Mới', 'Thành viên 3', 'feature/seller-cart')}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSellerDashboard={() => handlePendingFeatureNotice('Kênh Quản Lý Bán Hàng', 'Thành viên 3', 'feature/seller-cart')}
        onOpenAdminDashboard={() => handlePendingFeatureNotice('Bảng Điều Khiển Admin', 'Thành viên 4', 'feature/admin-dashboard')}
        activeFilterType={activeFilterType}
        onFilterTypeChange={setActiveFilterType}
        onShowToast={showToast}
      />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow-1">
        {/* HERO BANNER */}
        {selectedCategory === 'all' && !searchQuery && (
          <HeroBanner 
            onSelectAuctionFilter={() => setActiveFilterType('auction')} 
          />
        )}

        {/* CATEGORY GRID */}
        {!searchQuery && (
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {/* TEAM WORKFLOW & MODULE STATUS DASHBOARD */}
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-3 mb-4">
            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <Code2 className="text-primary" size={20} />
                <h5 className="fw-bold mb-0 text-dark">Tiến Độ Kiến Trúc & Phân Hệ Đồ Án (Team Module Status)</h5>
              </div>
              <span className="badge bg-primary px-3 py-2">Nhánh hiện tại: feature/auth-user</span>
            </div>
            <div className="card-body p-4">
              <p className="text-secondary small mb-4">
                Dưới đây là bảng theo dõi tiến độ tích hợp các module của 4 thành viên theo quy trình Git chuẩn.
                Mỗi thành viên làm việc độc lập trên nhánh riêng và hợp nhất mã nguồn thông qua Pull Request.
              </p>

              <div className="row g-3">
                {/* Member 1 (Leader - You) */}
                <div className="col-md-6">
                  <div className="p-3 border rounded-3 bg-white border-start border-4 border-success h-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong className="text-success d-flex align-items-center gap-1">
                          <CheckCircle2 size={16} /> Thành viên 1 (Team Leader)
                        </strong>
                        <small className="text-muted d-block">Core Architecture, Auth & User Profile</small>
                      </div>
                      <span className="badge bg-success">Đã hoàn thành</span>
                    </div>
                    <ul className="small text-secondary ps-3 mb-2" style={{ fontSize: '0.82rem' }}>
                      <li>Khung xương dự án, layout Base & .gitignore chuẩn</li>
                      <li>Mock Users 4 Roles (Guest, Buyer, Seller, Admin)</li>
                      <li>AuthContext quản lý state toàn cục & localStorage</li>
                      <li>Modal Đăng nhập / Đăng ký có 1-Click Fast Login</li>
                      <li>Header động thay đổi avatar & menu theo vai trò</li>
                      <li>Modal Quản lý Hồ sơ cá nhân (User Profile)</li>
                    </ul>
                    <div className="mt-2 pt-2 border-top d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary py-0 px-2"
                        style={{ fontSize: '0.78rem' }}
                        onClick={() => setIsAuthOpen(true)}
                      >
                        Mở Auth Modal
                      </button>
                      {isAuthenticated && (
                        <button 
                          className="btn btn-sm btn-outline-success py-0 px-2"
                          style={{ fontSize: '0.78rem' }}
                          onClick={() => setIsProfileOpen(true)}
                        >
                          Mở Profile Modal
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Member 2 */}
                <div className="col-md-6">
                  <div className="p-3 border rounded-3 bg-white border-start border-4 border-warning h-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong className="text-dark d-flex align-items-center gap-1">
                          <Clock size={16} className="text-warning" /> Thành viên 2 (Frontend Dev)
                        </strong>
                        <small className="text-muted d-block">Catalog, Real-time Countdown & Bidding Engine</small>
                      </div>
                      <span className="badge bg-warning text-dark">Chờ PR #2</span>
                    </div>
                    <ul className="small text-secondary ps-3 mb-2" style={{ fontSize: '0.82rem' }}>
                      <li>ProductCatalog & bộ lọc đa tiêu chí (giá, loại hàng)</li>
                      <li>ProductCard đếm ngược thời gian thực (ticker timer)</li>
                      <li>ProductDetailModal xem gallery ảnh & lịch sử bid</li>
                      <li>Bidding Engine: kiểm tra giá bid hợp lệ & quick bid</li>
                      <li>WatchlistDrawer theo dõi sản phẩm yêu thích</li>
                    </ul>
                    <span className="badge bg-light text-muted border" style={{ fontSize: '0.75rem' }}>
                      Nhánh: feature/catalog-bidding
                    </span>
                  </div>
                </div>

                {/* Member 3 */}
                <div className="col-md-6">
                  <div className="p-3 border rounded-3 bg-white border-start border-4 border-info h-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong className="text-dark d-flex align-items-center gap-1">
                          <Clock size={16} className="text-info" /> Thành viên 3 (Frontend Dev)
                        </strong>
                        <small className="text-muted d-block">Seller Portal, Cart Drawer & Checkout Flow</small>
                      </div>
                      <span className="badge bg-info text-white">Chờ PR #3</span>
                    </div>
                    <ul className="small text-secondary ps-3 mb-2" style={{ fontSize: '0.82rem' }}>
                      <li>SellModal: Form đăng bán sản phẩm & tạo đấu giá mới</li>
                      <li>SellerDashboardModal: Kênh quản lý tin đăng của người bán</li>
                      <li>CartDrawer: Giỏ hàng tăng giảm số lượng & tính tổng tiền</li>
                      <li>CheckoutModal: Điền thông tin giao hàng & chọn COD/VietQR</li>
                    </ul>
                    <span className="badge bg-light text-muted border" style={{ fontSize: '0.75rem' }}>
                      Nhánh: feature/seller-cart
                    </span>
                  </div>
                </div>

                {/* Member 4 */}
                <div className="col-md-6">
                  <div className="p-3 border rounded-3 bg-white border-start border-4 border-danger h-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong className="text-dark d-flex align-items-center gap-1">
                          <Clock size={16} className="text-danger" /> Thành viên 4 (Frontend Dev)
                        </strong>
                        <small className="text-muted d-block">Admin Dashboard, Moderation & Analytics</small>
                      </div>
                      <span className="badge bg-danger">Chờ PR #4</span>
                    </div>
                    <ul className="small text-secondary ps-3 mb-2" style={{ fontSize: '0.82rem' }}>
                      <li>AdminDashboardModal: 4 thẻ KPI thống kê sàn trực quan</li>
                      <li>Quản lý người dùng: Khóa/Mở tài khoản (Active/Banned)</li>
                      <li>Phân quyền vai trò: Dropdown đổi Role (Buyer ↔ Seller ↔ Admin)</li>
                      <li>Kiểm duyệt sản phẩm: Duyệt và gỡ bỏ sản phẩm vi phạm</li>
                    </ul>
                    <span className="badge bg-light text-muted border" style={{ fontSize: '0.75rem' }}>
                      Nhánh: feature/admin-dashboard
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. FOOTER (Base layout) */}
      <Footer />

      {/* 4. MODALS (Member 1 Features) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onShowToast={showToast}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onShowToast={showToast}
      />

      {/* 5. GLOBAL TOAST NOTIFICATION */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
