# 🛡️ Admin Web Đọc Truyện (Standalone Admin Portal)

Trang web Quản trị (Admin Portal) chuyên dụng cho Website Đọc Truyện, sẵn sàng triển khai độc lập lên **Vercel** và kết nối trực tiếp với **User Web**.

---

## ✨ Tính năng Quản trị
- 🔐 **Bảo mật & Đăng nhập (Admin Login)**: Quyền độc quyền dành riêng cho Super Admin duy nhất.
- 📊 **Thống kê Độc giả theo Thời gian**: Biểu đồ tương tác thời gian (24h, 7 ngày, 30 ngày), KPI Views, Độc giả thực tế (Unique Readers), Thời gian đọc TB, BXH Top truyện & Luồng đọc trực tiếp.
- 📚 **Quản lý Truyện**: Tạo mới, chỉnh sửa, xoá an toàn.
- 🔘 **Bật/Tắt Inactive (Ẩn/Hiện)**: Nút gạt 1 chạm ẩn/hiển thị truyện hoặc chương tức thì.
- 📝 **Đăng tải Chương (Up chương)**: Studio soạn thảo chuyên nghiệp, đếm từ, giãn dòng, chèn mẫu nhanh và **Chế độ xem trước (Live Preview)**.
- 🔗 **Liên kết Web Đọc**: Nút mở nhanh Web Đọc của bạn.

---

## 🔑 Tài khoản Super Admin Duy Nhất
- 👑 **Super Admin (Chủ sở hữu)**: `admin` / Mật khẩu: `admin123`

---

## 🚀 Hướng dẫn Deploy lên Vercel

### Cách 1: Deploy bằng Vercel CLI (Nhanh nhất)
```bash
cd /Users/enosta/.gemini/antigravity/scratch/admin-web-doc-truyen
npx vercel
```

### Cách 2: Đẩy lên GitHub & Import vào Vercel
1. Khởi tạo Git & Push lên GitHub:
```bash
cd /Users/enosta/.gemini/antigravity/scratch/admin-web-doc-truyen
git init
git add .
git commit -m "Initial Admin Portal"
git branch -M main
git remote add origin <URL_REPO_GITHUB_CỦA_BẠN>
git push -u origin main
```
2. Truy cập [vercel.com/new](https://vercel.com/new) -> Import repo -> Nhấn **Deploy**.
