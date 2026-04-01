// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGLYESRLBQmXbIZuTUa-QGRNu0XHYij0U",
    authDomain: "ai-symp-dedecter.firebaseapp.com",
    projectId: "ai-symp-dedecter",
    storageBucket: "ai-symp-dedecter.firebasestorage.app",
    messagingSenderId: "27755382801",
    appId: "1:27755382801:web:233d8a2b20164d3cf3c9b0",
    measurementId: "G-B2464JV7F3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
