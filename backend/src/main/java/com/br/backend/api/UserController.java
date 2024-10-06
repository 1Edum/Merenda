package com.br.backend.api;

import com.br.backend.model.Role;
import com.br.backend.model.User;
import com.br.backend.repository.RoleRepository;
import com.br.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Listar todos os usuários
    @GetMapping("/listar")
    public List<User> listar() {
        return userRepository.findAll();
    }

    // Inserir um único usuário
    @PostMapping("/inserir")
    public ResponseEntity<User> inserir(@RequestBody User user) {
        // Hash a senha antes de criar o usuário
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = createUserWithRolesAndClassRooms(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Inserir múltiplos usuários
    @PostMapping("/inserir-varios")
    public ResponseEntity<Void> inserirVarios(@RequestBody List<User> users) {
        List<User> savedUsers = new ArrayList<>();
        for (User user : users) {
            // Hash a senha de cada usuário antes de salvar
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            savedUsers.add(createUserWithRolesAndClassRooms(user));
        }
        userRepository.saveAll(savedUsers);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Deletar um usuário por ID
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable("id") Long id) {
        try {
            Optional<User> existingUser = userRepository.findById(id);
            if (existingUser.isPresent()) {
                User user = existingUser.get();

                // Remova todas as associações do usuário com roles (funções)
                user.getRoles().clear();

                // Salve o usuário sem as associações
                userRepository.save(user);

                // Agora podemos deletar o usuário
                userRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Logar a exceção para ver detalhes no log do servidor
            System.err.println("Erro ao deletar o usuário: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Função auxiliar para salvar o usuário com roles e classRoom
    private User createUserWithRolesAndClassRooms(User user) {
        // Processa as roles
        List<Role> roles = new ArrayList<>();
        for (Role role : user.getRoles()) {
            Role existingRole = roleRepository.findByName(role.getName());
            if (existingRole == null) {
                existingRole = roleRepository.save(role);  // Salva nova role, se não existir
            }
            roles.add(existingRole);
        }

        // Atualiza o usuário com as roles processadas
        user.setRoles(roles);

        // Salva o usuário e retorna
        return userRepository.save(user);
    }
}
