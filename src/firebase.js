import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX2EO9QKKN9ZNKZfLQjLAGohkwacFxZkQ",
  authDomain: "binaire-netflix.firebaseapp.com",
  projectId: "binaire-netflix",
  storageBucket: "binaire-netflix.firebasestorage.app",
  messagingSenderId: "171784767720",
  appId: "1:171784767720:web:89f599afb7ac937eea215d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// console.log(auth)
export default app;