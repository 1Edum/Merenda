// src/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

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

// Inicializa o Analytics apenas se for suportado
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Exporta o Firebase Storage e Analytics (se suportado) para serem usados em outros lugares da aplicação
export const storage = getStorage(app);
export { analytics };
export default app;
