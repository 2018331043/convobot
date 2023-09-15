package com.arcane.convobot.service;

import com.arcane.convobot.config.JwtService;
import com.arcane.convobot.enums.Role;
import com.arcane.convobot.pojo.User;
import com.arcane.convobot.pojo.request.LoginRequest;
import com.arcane.convobot.pojo.request.RegisterRequest;
import com.arcane.convobot.pojo.response.LoginResponse;
import com.arcane.convobot.pojo.response.RegistrationResponse;
import com.arcane.convobot.repo.UserRepository;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public RegistrationResponse registerUser(RegisterRequest request){
        User existingUser = userRepository.findByEmail(request.getEmail()).orElseGet(()->null);
        if(existingUser != null){
            throw new RuntimeException("The provided email already exists for a user.");
        }
        User user = User.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return RegistrationResponse.builder()
                .token(jwtToken)
                .build();
    }
    public LoginResponse loginUser(LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return LoginResponse.builder()
                .token(jwtToken)
                .userName(user.userName)
                .build();
    }
}
