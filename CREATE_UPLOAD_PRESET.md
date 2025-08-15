# Hướng dẫn tạo Upload Preset trong Cloudinary

## Bước 1: Đăng nhập Cloudinary Dashboard

1. Truy cập [cloudinary.com/console](https://cloudinary.com/console)
2. Đăng nhập vào tài khoản của bạn

## Bước 2: Vào Settings

1. Click vào **Settings** (biểu tượng bánh răng) ở menu bên trái
2. Chọn tab **Upload**

## Bước 3: Tạo Upload Preset

1. Scroll xuống phần **Upload presets**
2. Click **"Add upload preset"**

## Bước 4: Cấu hình Upload Preset

### Thông tin cơ bản:
- **Preset name:** `food_images` (hoặc tên khác)
- **Signing Mode:** Chọn **Unsigned** ⭐ (QUAN TRỌNG!)

### Cấu hình nâng cao (tùy chọn):
- **Folder:** `foods/` (tự động tạo folder)
- **Allowed formats:** `jpg,png,gif,webp`
- **Max file size:** `10MB`
- **Transformation:** `w_800,h_600,c_fill` (resize ảnh)

## Bước 5: Save

Click **"Save"** để lưu upload preset

## Bước 6: Kiểm tra

Sau khi tạo, preset sẽ xuất hiện trong danh sách **Upload presets**

## Troubleshooting

### Lỗi "Upload preset not found"
- Kiểm tra tên preset có đúng không
- Đảm bảo preset được set là **Unsigned**
- Refresh trang và thử lại

### Lỗi "Upload preset must be whitelisted"
- Đảm bảo **Signing Mode** là **Unsigned**
- Không chọn **Signed**

### Không thấy preset sau khi tạo
- Refresh trang
- Kiểm tra lại trong Settings → Upload 