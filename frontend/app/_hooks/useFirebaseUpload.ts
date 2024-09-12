// useFirebaseUpload.ts
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseApp } from 'firebase/app'; // Ajuste o caminho conforme necessário

import { storage } from '../firebaseConfig';

// Tipos para o estado e erros
interface UseFirebaseUploadResult {
  uploadFile: (file: File) => Promise<string | null>;
  uploading: boolean;
  error: string | null;
}

const useFirebaseUpload = (): UseFirebaseUploadResult => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage); // Referência ao storage
      const fileRef = ref(storageRef, `images/${file.name}`); // Referência ao arquivo
      await uploadBytes(fileRef, file); // Upload do arquivo

      const downloadURL = await getDownloadURL(fileRef); // Obtém a URL de download
      return downloadURL;
    } catch (err) {
      setError((err as Error).message); // Define a mensagem de erro
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, error };
};

export default useFirebaseUpload;
