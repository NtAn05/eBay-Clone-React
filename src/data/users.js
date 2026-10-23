export const INITIAL_USERS = [
  {
    id: 'usr-admin-01',
    name: 'Lê Quản Trị',
    email: 'admin@demo.com',
    password: 'password123',
    role: 'admin', // 'guest', 'buyer', 'seller', 'admin'
    phone: '0901234567',
    address: 'Tòa nhà FPT, Cầu Giấy, Hà Nội',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'active', // 'active', 'banned'
    walletBalance: 25000.00,
    joinedDate: '2024-01-15'
  },
  {
    id: 'usr-seller-01',
    name: 'Trần Thị Bán',
    email: 'seller@demo.com',
    password: 'password123',
    role: 'seller',
    phone: '0912345678',
    address: 'Quận 1, TP. Hồ Chí Minh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    storeName: 'TechDeals Official Store',
    rating: 99.8,
    walletBalance: 14850.00,
    joinedDate: '2024-03-20'
  },
  {
    id: 'usr-buyer-01',
    name: 'Nguyễn Văn Mua',
    email: 'buyer@demo.com',
    password: 'password123',
    role: 'buyer',
    phone: '0987654321',
    address: 'Ngũ Hành Sơn, Đà Nẵng',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    walletBalance: 3200.00,
    joinedDate: '2024-06-10'
  },
  {
    id: 'usr-buyer-02',
    name: 'Phạm Minh Trí',
    email: 'tri.pham@demo.com',
    password: 'password123',
    role: 'buyer',
    phone: '0933221100',
    address: 'Hải Châu, Đà Nẵng',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    status: 'banned', // Tài khoản bị khóa để test tính năng Admin
    walletBalance: 120.00,
    joinedDate: '2024-08-01'
  }
];
