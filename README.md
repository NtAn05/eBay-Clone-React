# eBay Auction Platform - Front-End Project (Member 1 - Team Leader)

## 📌 Giới thiệu dự án
Dự án được xây dựng trên nền tảng **React 18** và **Bootstrap 5**, mô phỏng sàn đấu giá và mua sắm trực tuyến đa vai trò (Online Auction & E-Commerce Platform).

## 👤 Thông tin Thành viên 1 (Team Leader)
- **Họ và tên:** Nguyễn Văn Leader (Thành viên 1)
- **Vai trò:** Team Leader & Core Architect
- **Phân hệ phụ trách:** Core Architecture, Authentication & User Profile Management
- **Nhánh Git phụ trách:** `main`, `develop`, `feature/auth-user`

## 📂 Danh mục File mã nguồn thuộc nhiệm vụ của Thành viên 1:
1. `src/data/users.js`: Dữ liệu mock users cho 4 vai trò (Guest, Buyer, Seller, Admin)
2. `src/context/AuthContext.jsx`: Quản lý state xác thực, lưu trữ `localStorage`, phân quyền người dùng
3. `src/components/AuthModal.jsx`: Modal Đăng nhập / Đăng ký có validate và nút 1-Click Fast Demo Login
4. `src/components/UserProfileModal.jsx`: Modal Quản lý hồ sơ cá nhân, đổi mật khẩu, xem lịch sử đấu giá
5. `src/components/Header.jsx`: Header động hiển thị Avatar, Role Badge, Menu Dropdown theo từng quyền hạn
6. `src/components/ToastNotification.jsx`: Hệ thống thông báo nổi góc màn hình
7. `src/App.jsx`: Khung điều phối trung tâm tích hợp AuthProvider và các modal

## 🚀 Hướng dẫn chạy dự án trên máy
```bash
# 1. Cài đặt thư viện phụ thuộc (nếu chưa có node_modules)
npm install

# 2. Khởi chạy ứng dụng ở môi trường Development
npm start
```

## 🛠️ Quy trình Git Commit cho Leader
Xem chi tiết các câu lệnh tại tệp: [`HUONG_DAN_COMMIT_LEADER.md`](./HUONG_DAN_COMMIT_LEADER.md)
