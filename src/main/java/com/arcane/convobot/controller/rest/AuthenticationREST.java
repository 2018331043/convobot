package com.arcane.convobot.controller.rest;

import com.arcane.convobot.controller.async.AuthenticationControllerAsync;
import com.arcane.convobot.pojo.request.LoginRequest;
import com.arcane.convobot.pojo.request.RegisterRequest;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.pojo.response.RegistrationResponse;
import com.arcane.convobot.pojo.response.LoginResponse;
import com.arcane.convobot.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationREST {
    private final AuthenticationControllerAsync authenticationControllerAsync;
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<GenericResponseREST> registerUser(
            @RequestBody RegisterRequest registerRequest
    ) {
        try {
            return ResponseEntity.ok(authenticationService.registerUser(registerRequest));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<GenericResponseREST> loginUser(
            @RequestBody LoginRequest loginRequest
    ){
        try {
            return ResponseEntity.ok(authenticationService.loginUser(loginRequest));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
}
