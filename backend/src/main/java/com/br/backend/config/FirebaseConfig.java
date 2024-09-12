package com.br.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @SuppressWarnings("deprecation")
    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        // Carregar o arquivo JSON do classpath
        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");

        if (serviceAccount == null) {
            throw new FileNotFoundException("Não foi possível encontrar o arquivo serviceAccountKey.json no classpath.");
        }

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("your-bucket-name.appspot.com")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}
