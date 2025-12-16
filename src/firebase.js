// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrMgrKVoRrmvao4QSy-3-T896n6VFNNDQ",
  authDomain: "mi-app-holi.firebaseapp.com",
  projectId: "mi-app-holi",
  storageBucket: "mi-app-holi.firebasestorage.app",
  messagingSenderId: "511502008091",
  appId: "1:511502008091:web:ee0c10607e5fca952f9dbe"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Auth, Firestore y proveedor de Google
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Export default app (opcional)
export default app;

