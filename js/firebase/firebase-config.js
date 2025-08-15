// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBsVj72yN47tpne29r1V53XbDolXvRnpOw",
  authDomain: "mindx-sample-project.firebaseapp.com",
  projectId: "mindx-sample-project",
  storageBucket: "mindx-sample-project.firebasestorage.app",
  messagingSenderId: "386421442833",
  appId: "1:386421442833:web:d138b2b6f1b8e761c224b0",
  measurementId: "G-130609YJLV",
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)

console.log("Firebase initialized:", app.name)
