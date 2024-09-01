// src/_hooks/useFirebaseUpload.ts

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig';

const useFirebaseUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      // Cria uma referência para o arquivo no Firebase Storage
      const fileRef = ref(storage, `images/${file.name}`);
      
      // Faz o upload do arquivo
      const snapshot = await uploadBytes(fileRef, file);

      // Obtém a URL pública do arquivo
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setUrl(downloadURL);
      return downloadURL;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, url, error };
};

export default useFirebaseUpload;
