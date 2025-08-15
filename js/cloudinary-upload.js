// // cloudinary-upload.js - Xử lý upload ảnh lên Cloudinary
// // Không dùng import Cloudinary package, chỉ dùng fetch API

// // Upload ảnh lên Cloudinary
// export async function uploadToCloudinary(file) {
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

// // Upload với options tùy chỉnh
// export async function uploadToCloudinaryWithOptions(file, options = {}) {
//     try {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'mindx-test');
        
//         // Thêm các options tùy chỉnh
//         if (options.folder) {
//             formData.append('folder', options.folder);
//         }
//         if (options.public_id) {
//             formData.append('public_id', options.public_id);
//         }
//         if (options.transformation) {
//             formData.append('transformation', options.transformation);
//         }
        
//         const response = await fetch(`https://api.cloudinary.com/v1_1/dcadizjkf/image/upload`, {
//             method: 'POST',
//             body: formData
//         });
        
//         const result = await response.json();
        
//         if (result.secure_url) {
//             console.log('Upload thành công với options:', result.secure_url);
//             return result.secure_url;
//         } else {
//             throw new Error('Upload thất bại');
//         }
//     } catch (error) {
//         console.error('Lỗi upload với options:', error);
//         throw error;
//     }
// }

// // Xóa ảnh từ Cloudinary (cần server-side implementation)
// export async function deleteFromCloudinary(publicId) {
//     try {
//         // Lưu ý: Xóa ảnh cần server-side implementation
//         // Client-side không thể xóa trực tiếp vì cần API secret
//         console.warn('Xóa ảnh cần server-side implementation');
//         throw new Error('Xóa ảnh cần server-side implementation');
//     } catch (error) {
//         console.error('Lỗi xóa ảnh:', error);
//         throw error;
//     }
// }

// // Tạo URL với transformation
// export function getCloudinaryUrl(publicId, options = {}) {
//     const baseUrl = `https://res.cloudinary.com/dcadizjkf/image/upload`;
//     const transformations = [];
    
//     if (options.width) transformations.push(`w_${options.width}`);
//     if (options.height) transformations.push(`h_${options.height}`);
//     if (options.crop) transformations.push(`c_${options.crop}`);
//     if (options.quality) transformations.push(`q_${options.quality}`);
//     if (options.format) transformations.push(`f_${options.format}`);
    
//     const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
    
//     return `${baseUrl}/${transformationString}${publicId}`;
// } 