// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOQHxrBGo-GZPfe1VrM3z1uURJmk__K9w",
  authDomain: "products-4-u.firebaseapp.com",
  projectId: "products-4-u",
  storageBucket: "products-4-u.firebasestorage.app",
  messagingSenderId: "857994708234",
  appId: "1:857994708234:web:bcd802c8dfa9316ff426f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;