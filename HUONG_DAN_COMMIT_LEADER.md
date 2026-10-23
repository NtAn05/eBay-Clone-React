# HƯỚNG DẪN CÁC LỆNH GIT COMMIT CHO THÀNH VIÊN 1 (TEAM LEADER)

Tài liệu này hướng dẫn chi tiết từng câu lệnh để bạn (Thành viên 1 - Leader) khởi tạo Git repository từ đầu, đẩy khung dự án lên nhánh `main`, tạo nhánh `develop`, và thực hiện commit phần nhiệm vụ của mình trên nhánh `feature/auth-user` theo chuẩn GitHub Flow.

---

## 📌 BƯỚC 1: Khởi tạo Git và Đẩy Khung Rỗng lên nhánh `main`

Mở Terminal / PowerShell tại thư mục `eBay_Project`:
```powershell
cd c:\Users\anngu\Downloads\FER_Assignment\eBay_Project

# 1. Khởi tạo Git repository
git init

# 2. Thêm toàn bộ khung dự án ban đầu vào Staging
git add .

# 3. Tạo commit khởi tạo khung xương dự án
git commit -m "chore: initial project skeleton with base layout, dependencies and auth architecture"

# 4. Đổi tên nhánh mặc định thành main
git branch -M main

# 5. Liên kết tới GitHub Repository của nhóm (thay URL của bạn vào)
git remote add origin https://github.com/your-username/ebay-auction-platform.git

# 6. Đẩy nhánh main lên GitHub
git push -u origin main
```

---

## 📌 BƯỚC 2: Tạo Nhánh Phát Triển Chung (`develop`)

```powershell
# 1. Tạo và chuyển sang nhánh develop
git checkout -b develop

# 2. Đẩy nhánh develop lên GitHub
git push -u origin develop
```

---

## 📌 BƯỚC 3: Tạo Nhánh Tính Năng Của Leader (`feature/auth-user`)

```powershell
# 1. Từ nhánh develop, tạo nhánh tính năng của bạn
git checkout -b feature/auth-user

# 2. Kiểm tra trạng thái các file
git status

# 3. Commit xác nhận phần việc của Thành viên 1
git add src/data/users.js src/context/AuthContext.jsx src/components/AuthModal.jsx src/components/UserProfileModal.jsx src/components/Header.jsx src/components/ToastNotification.jsx src/App.jsx
git commit -m "feat(auth): implement user authentication, mock users, profile modal and dynamic header"

# 4. Đẩy nhánh feature/auth-user lên GitHub
git push -u origin feature/auth-user
```

---

## 📌 BƯỚC 4: Tạo Pull Request #1 trên GitHub Web

1. Truy cập vào trang GitHub của repository: `https://github.com/your-username/ebay-auction-platform`.
2. Bạn sẽ thấy thanh thông báo màu vàng: **"feature/auth-user had recent pushes"** → Nhấn nút **"Compare & pull request"**.
3. **Cấu hình nhánh:**
   - `base: develop` ← `compare: feature/auth-user` *(Lưu ý: Merge vào develop, KHÔNG merge thẳng vào main)*.
4. **Tiêu đề PR:** `feat(auth): Implement Authentication, User Profile and Role Management`
5. **Mô tả PR:**
   ```markdown
   ### Tóm tắt công việc hoàn thành (Thành viên 1 - Team Leader):
   - [x] Khởi tạo khung dự án, cấu hình .gitignore và base layout
   - [x] Thiết kế Mock Data 4 Roles (Guest, Buyer, Seller, Admin) trong `users.js`
   - [x] Xây dựng `AuthContext` quản lý state đăng nhập toàn cục và localStorage
   - [x] Hoàn thiện `AuthModal` (Đăng nhập, Đăng ký, 1-Click Fast Login)
   - [x] Hoàn thiện `UserProfileModal` (Hồ sơ, Đổi mật khẩu, Lịch sử)
   - [x] Cập nhật `Header` hiển thị Avatar và menu phân quyền linh hoạt
   ```
6. Nhấn **"Create pull request"** → Leader duyệt và nhấn **"Merge pull request"** (hoặc "Squash and merge").

---

## 📌 BƯỚC 5: Hướng Dẫn Các Thành Viên Còn Lại Tiếp Nhận Code

Sau khi bạn đã merge PR #1 vào `develop`:
- **Thành viên 2** (Catalog & Bidding): Kéo `develop` về, tạo nhánh `feature/catalog-bidding`, cắm các component `ProductCatalog`, `ProductCard`, `ProductDetailModal` vào.
- **Thành viên 3** (Seller & Cart): Kéo `develop` về, tạo nhánh `feature/seller-cart`, cắm `SellModal`, `SellerDashboardModal`, `CartDrawer`, `CheckoutModal` vào.
- **Thành viên 4** (Admin Dashboard): Kéo `develop` về, tạo nhánh `feature/admin-dashboard`, cắm `AdminDashboardModal` vào.
