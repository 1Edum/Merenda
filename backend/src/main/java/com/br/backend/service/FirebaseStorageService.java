package com.br.backend.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FirebaseStorageService {
    public String uploadFile(MultipartFile file) throws IOException {
        // Gerar um nome único para o arquivo
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        // Acessar o bucket do Firebase
        Bucket bucket = StorageClient.getInstance().bucket();

        // Fazer o upload do arquivo para o Firebase Storage
        Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

        // Retornar a URL pública do arquivo
        return blob.getMediaLink();
    }
}
