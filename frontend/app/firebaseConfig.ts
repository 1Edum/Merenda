// src/firebaseConfig.ts

// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9RTeg6pFXfDO4otBuIBmKClZRoyooG1g",
  authDomain: "merenda-a7389.firebaseapp.com",
  projectId: "merenda-a7389",
  storageBucket: "merenda-a7389.appspot.com",
  messagingSenderId: "583785316496",
  appId: "1:583785316496:web:1a5297665f7d735c4c5815",
  measurementId: "G-YSHDND5XKS"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Analytics, caso você precise usar
const analytics = getAnalytics(app);

// Exporta o Firebase Storage para ser usado em outros lugares da aplicação
export const storage = getStorage(app);

export default app;
