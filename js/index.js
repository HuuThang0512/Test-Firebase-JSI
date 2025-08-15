// // index.js - Upload ảnh lên Cloudinary
// // Không dùng import Cloudinary package, chỉ dùng fetch API

// // Upload ảnh lên Cloudinary
// async function uploadToCloudinary(file) {
//     try {
//         // Tạo FormData để upload file
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'mindx-test'); // Thay bằng upload preset của bạn
        
//         // Upload lên Cloudinary
//         const response = await fetch(`https://api.cloudinary.com/v1_1/dcadizjkf/image/upload`, {
//             method: 'POST',
//             body: formData
//         });
        
//         const result = await response.json();
        
//         if (result.secure_url) {
//             console.log('Upload thành công:', result.secure_url);
//             return result.secure_url;
//         } else {
//             throw new Error('Upload thất bại');
//         }
//     } catch (error) {
//         console.error('Lỗi upload:', error);
//         throw error;
//     }
// }

// // Setup event listeners
// document.addEventListener('DOMContentLoaded', () => {
//     const fileInput = document.getElementById('file-input');
//     const uploadBtn = document.getElementById('upload-btn');
//     const imagePreview = document.getElementById('image-preview');
//     const statusDiv = document.createElement('div');
//     statusDiv.id = 'upload-status';
//     statusDiv.style.marginTop = '10px';
//     document.body.appendChild(statusDiv);

//     // Preview ảnh khi chọn file
//     fileInput.addEventListener('change', (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 imagePreview.src = e.target.result;
//                 imagePreview.style.display = 'block';
//             };
//             reader.readAsDataURL(file);
//         }
//     });

//     // Upload khi bấm nút
//     uploadBtn.addEventListener('click', async () => {
//         const file = fileInput.files[0];
//         if (!file) {
//             alert('Vui lòng chọn file ảnh trước!');
//             return;
//         }

//         // Disable button và hiển thị loading
//         uploadBtn.disabled = true;
//         uploadBtn.textContent = 'Đang upload...';
//         statusDiv.innerHTML = '<p style="color: blue;">🔄 Đang upload ảnh...</p>';

//         try {
//             const imageUrl = await uploadToCloudinary(file);
            
//             statusDiv.innerHTML = `
//                 <p style="color: green;">✅ Upload thành công!</p>
//                 <p><strong>URL:</strong> <a href="${imageUrl}" target="_blank">${imageUrl}</a></p>
//                 <button onclick="copyToClipboard('${imageUrl}')" style="margin: 5px; padding: 5px 10px;">📋 Copy URL</button>
//             `;
            
//             // Có thể lưu URL vào database hoặc sử dụng cho mục đích khác
//             console.log('Image URL for database:', imageUrl);
            
//         } catch (error) {
//             statusDiv.innerHTML = `<p style="color: red;">❌ Lỗi upload: ${error.message}</p>`;
//         } finally {
//             uploadBtn.disabled = false;
//             uploadBtn.textContent = 'Upload';
//         }
//     });
// });

// // Function copy URL to clipboard
// window.copyToClipboard = function(text) {
//     navigator.clipboard.writeText(text).then(() => {
//         alert('Đã copy URL vào clipboard!');
//     }).catch(err => {
//         console.error('Lỗi copy:', err);
//         // Fallback cho trình duyệt cũ
//         const textArea = document.createElement('textarea');
//         textArea.value = text;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//         alert('Đã copy URL vào clipboard!');
//     });
// };