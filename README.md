# Sàn Đấu Giá Trực Tuyến & Mua Sắm Thương Mại Điện Tử (eBay Clone)

Dự án Web Application mô phỏng nền tảng thương mại điện tử và đấu giá trực tuyến theo mô hình của eBay, được xây dựng trên nền tảng **React 18** và **Bootstrap 5**. Hệ thống hỗ trợ song song hai hình thức giao dịch: **Đấu giá trực tuyến thời gian thực (Live Auction)** và **Mua ngay cố định (Buy-It-Now)**.

---

## 🌟 Tính Năng Nổi Bật

### 1. Hệ thống Đấu Giá Trực Tuyến (Online Auction System)
* **Real-time Countdown Ticker:** Bộ đếm ngược thời gian phiên đấu giá chính xác đến từng giây.
* **Cơ chế Đặt giá thầu (Bidding Engine):** Tự động kiểm tra điều kiện hợp lệ, kiểm tra bước giá tối thiểu (Min Increment).
* **Quick Bid:** Tính năng nâng giá nhanh một chạm (+$10, +$50, +$100).
* **Lịch sử Đặt giá (Bid History):** Ghi nhận chi tiết danh sách người tham gia, thời gian và mức giá đấu.

### 2. Mua Ngay Cố Định & Thanh Toán (Buy-It-Now & Checkout)
* Mua đứt sản phẩm theo giá niêm yết mà không cần tham gia đấu giá.
* **Giỏ hàng tiện lợi (Cart Drawer):** Thêm/bớt, cập nhật số lượng, tạm tính tiền và phí vận chuyển.
* **Quy trình Thanh toán (Checkout):** Nhập thông tin nhận hàng và lựa chọn đa dạng phương thức (COD, Chuyển khoản VietQR, Ví điện tử).

### 3. Danh Mục & Bộ Lọc Tìm Kiếm Đa Chiều
* Tìm kiếm tức thì theo từ khóa, tên sản phẩm, thương hiệu hoặc người bán.
* Lọc sản phẩm theo 8 danh mục hàng hóa (Điện tử, Thời trang, Sưu tầm, Phụ tùng xe, Đồ chơi, Nhà cửa,...).
* Lọc nâng cao: theo khoảng giá, tình trạng hàng hóa (Mới/Refurbished), hình thức bán (Đấu giá / Mua ngay) và sắp xếp linh hoạt.
* **Danh sách theo dõi (Watchlist):** Lưu các sản phẩm quan tâm để theo dõi biến động giá.

### 4. Hệ thống Phân Quyền 4 Vai Trò (Multi-Role System)
* **Khách (Guest):** Khám phá sản phẩm, tìm kiếm, xem chi tiết phiên đấu giá.
* **Người mua (Buyer):** Tham gia đấu giá, mua ngay, quản lý giỏ hàng, hồ sơ cá nhân và theo dõi đơn mua.
* **Người bán (Seller):** Tạo phiên đấu giá mới, đăng bán sản phẩm, theo dõi lượt bid của khách và quản lý gian hàng (Seller Dashboard).
* **Quản trị viên (Admin):** Bảng điều khiển quản trị sàn, 4 chỉ số KPI thống kê, quản lý người dùng (Khóa/Mở tài khoản, Đổi vai trò) và kiểm duyệt sản phẩm vi phạm.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Front-End:** React 18, React DOM
* **Giao diện & UI:** React-Bootstrap 5, Bootstrap 5, CSS3 Grid/Flexbox
* **Icon System:** Lucide React
* **Quản lý State & Phiên:** Context API, LocalStorage
* **Mock Backend / Data:** `database.json` (tương thích JSON-Server)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Cài đặt các gói thư viện
```bash
npm install
```

### 2. Chạy ứng dụng ở môi trường Development
```bash
npm start
```
Ứng dụng sẽ tự động mở tại địa chỉ: [http://localhost:3000](http://localhost:3000)

### 3. Build bản Production
```bash
npm run build
```
Thư mục `build/` sẽ được tạo và tối ưu hóa sẵn sàng để deploy lên Vercel, Netlify hoặc GitHub Pages.
