package com.br.backend.service;

import com.br.backend.dto.LoginDto;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public interface AuthService {
    String login(LoginDto loginDto);
}
