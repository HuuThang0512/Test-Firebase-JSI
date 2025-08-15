# Hướng dẫn Setup Cloudinary

## 1. Tạo tài khoản Cloudinary

1. Truy cập [cloudinary.com](https://cloudinary.com)
2. Đăng ký tài khoản miễn phí
3. Xác nhận email

## 2. Lấy thông tin cấu hình

Sau khi đăng nhập vào Cloudinary Dashboard:

### **Cloud Name**
- Vào **Dashboard** → **Account Details**
- Copy **Cloud name** (ví dụ: `dcadizjkf`)

### **API Key & Secret**
- Vào **Dashboard** → **API Keys**
- Copy **API Key** và **API Secret**

### **Upload Preset**
- Vào **Settings** → **Upload**
- Tạo **Upload Preset** mới hoặc sử dụng preset có sẵn
- Đảm bảo **Signing Mode** là **Unsigned** (cho client-side upload)

## 3. Cập nhật code

### **Cập nhật file `js/main.js`**
```js
// Thay thế các giá trị này
cloudinary.config({ 
    cloud_name: 'YOUR_CLOUD_NAME', 
    api_key: 'YOUR_API_KEY', 
    api_secret: 'YOUR_API_SECRET'
});

// Và thay đổi upload_preset
formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');
```

### **Cập nhật file `js/index.js`**
```js
// Tương tự như trên
cloudinary.config({ 
    cloud_name: 'YOUR_CLOUD_NAME', 
    api_key: 'YOUR_API_KEY', 
    api_secret: 'YOUR_API_SECRET'
});
```

### **Cập nhật file `js/cloudinary-upload.js`**
```js
// Tương tự như trên
cloudinary.config({ 
    cloud_name: 'YOUR_CLOUD_NAME', 
    api_key: 'YOUR_API_KEY', 
    api_secret: 'YOUR_API_SECRET'
});
```

## 4. Cấu hình Upload Preset

### **Tạo Upload Preset mới:**
1. Vào **Settings** → **Upload**
2. Scroll xuống **Upload presets**
3. Click **Add upload preset**
4. Đặt tên (ví dụ: `food_images`)
5. Chọn **Signing Mode**: **Unsigned**
6. **Save**

### **Cấu hình thêm (tùy chọn):**
- **Folder**: `foods/` (tự động tạo folder)
- **Allowed formats**: `jpg,png,gif,webp`
- **Max file size**: `10MB`
- **Transformation**: `w_800,h_600,c_fill` (resize ảnh)

## 5. Test upload

1. Chạy local server:
```bash
python -m http.server 8000
```

2. Mở `http://localhost:8000/html/index.html`

3. Chọn file ảnh và upload

4. Kiểm tra Cloudinary Dashboard để xem ảnh đã upload

## 6. Sử dụng URL trong database

Sau khi upload thành công, bạn sẽ nhận được URL như:
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/filename.jpg
```

URL này có thể:
- Lưu vào Firestore cho món ăn
- Hiển thị trực tiếp trong HTML
- Transform (resize, crop) bằng cách thêm parameters

### **Ví dụ transform URL:**
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/w_300,h_200,c_fill/v1234567890/filename.jpg
```

## 7. Troubleshooting

### **Lỗi "Upload preset not found"**
- Kiểm tra tên upload preset có đúng không
- Đảm bảo preset được set là **Unsigned**

### **Lỗi "Invalid API key"**
- Kiểm tra API key và secret
- Đảm bảo cloud name đúng

### **Lỗi CORS**
- Đảm bảo domain được whitelist trong Cloudinary
- Hoặc sử dụng upload preset unsigned

### **File quá lớn**
- Kiểm tra cấu hình max file size trong upload preset
- Hoặc resize ảnh trước khi upload

## 8. Bảo mật

⚠️ **Lưu ý quan trọng:**
- Không commit API secret vào git
- Sử dụng environment variables trong production
- Chỉ sử dụng unsigned upload preset cho client-side
- Cấu hình CORS và domain restrictions

### **Environment Variables (Production):**
```js
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
``` 