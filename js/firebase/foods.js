// foods.js - Quản lý món ăn trong Firestore
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Thêm món ăn mới
export async function addFood(foodData) {
  try {
    const docRef = await addDoc(collection(db, "foods"), {
      ...foodData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    });
    console.log("Thêm món ăn thành công với ID:", docRef.id);
    return { id: docRef.id, ...foodData };
  } catch (error) {
    console.error("Lỗi thêm món ăn:", error);
    throw error;
  }
}
// Thêm dữ liệu mới vào db
// addDoc(collection(db, tên_collection), dữ_liệu_muốn_thêm);

// Lấy tất cả món ăn
export async function getAllFoods() {
  try {
    const q = query(collection(db, "foods"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const foods = [];

    querySnapshot.forEach((doc) => {
      foods.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return foods;
  } catch (error) {
    console.error("Lỗi lấy danh sách món ăn:", error);
    throw error;
  }
}

// Lấy món ăn đang hoạt động
export async function getActiveFoods() {
  try {
    const q = query(
      collection(db, "foods"),
      where("isActive", "==", true), // isActive = true là các món ăn đang hoạt động
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const foods = [];

    querySnapshot.forEach((doc) => {
      foods.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return foods;
  } catch (error) {
    console.error("Lỗi lấy món ăn hoạt động:", error);
    throw error;
  }
}

// Cập nhật món ăn
export async function updateFood(foodId, updateData) {
  try {
    const foodRef = doc(db, "foods", foodId);
    await updateDoc(foodRef, {
      ...updateData,
      updatedAt: new Date().toISOString(),
    });
    console.log("Cập nhật món ăn thành công!");
    return true;
  } catch (error) {
    console.error("Lỗi cập nhật món ăn:", error);
    throw error;
  }
}

// Xóa món ăn (soft delete)
export async function deleteFood(foodId) {
  try {
    const foodRef = doc(db, "foods", foodId);
    await updateDoc(foodRef, {
      isActive: false,
      updatedAt: new Date().toISOString(),
    });
    console.log("Xóa món ăn thành công!");
    return true;
  } catch (error) {
    console.error("Lỗi xóa món ăn:", error);
    throw error;
  }
}

// Xóa món ăn vĩnh viễn (chỉ admin)
export async function permanentDeleteFood(foodId) {
  try {
    const foodRef = doc(db, "foods", foodId);
    await deleteDoc(foodRef);
    console.log("Xóa vĩnh viễn món ăn thành công!");
    return true;
  } catch (error) {
    console.error("Lỗi xóa vĩnh viễn món ăn:", error);
    throw error;
  }
}
