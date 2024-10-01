package com.br.backend.api;



import com.br.backend.model.ClassRoom;
import com.br.backend.model.Food;
import com.br.backend.model.Role;
import com.br.backend.model.User;
import com.br.backend.repository.ClassRoomRepository;
import com.br.backend.repository.RoleRepository;
import com.br.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private ClassRoomRepository classRoomRepository;

    // Listar todos os usuários
    @GetMapping("/listar")
    public List<User> listar() {
        return userRepository.findAll();
    }

    // Inserir um único usuário
    @PostMapping("/inserir")
    public ResponseEntity<User> inserir(@RequestBody User user) {
        User savedUser = createUserWithRolesAndClassRooms(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Inserir múltiplos usuários
    @PostMapping("/inserir-varios")
    public ResponseEntity<Void> inserirVarios(@RequestBody List<User> users) {
        List<User> savedUsers = new ArrayList<>();
        for (User user : users) {
            savedUsers.add(createUserWithRolesAndClassRooms(user));
        }
        userRepository.saveAll(savedUsers);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Deletar um usuário por ID
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable("id") Long id) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

        // Processa as classRoom
        List<ClassRoom> classRooms = new ArrayList<>();
        for (ClassRoom classRoom : user.getClassRoom()) {
            ClassRoom existingClassRoom = classRoomRepository.findByName(classRoom.getName());
            if (existingClassRoom == null) {
                existingClassRoom = classRoomRepository.save(classRoom);  // Salva nova classRoom, se não existir
            }
            classRooms.add(existingClassRoom);
        }

        // Atualiza o usuário com as roles e classRoom processadas
        user.setRoles(roles);
        user.setClassRoom(classRooms);

        // Salva o usuário
        return userRepository.save(user);
    }
}
