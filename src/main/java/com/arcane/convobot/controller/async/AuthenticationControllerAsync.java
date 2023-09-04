package com.arcane.convobot.controller.async;

import com.arcane.convobot.pojo.request.LoginRequest;
import com.arcane.convobot.pojo.request.RegisterRequest;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.pojo.response.LoginResponse;
import com.arcane.convobot.pojo.response.RegistrationResponse;
import com.arcane.convobot.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.async.DeferredResult;

@Controller
@EnableAsync
@RequiredArgsConstructor
public class AuthenticationControllerAsync {
    private final AuthenticationService authenticationService;

    @Async
    public void registerUser(RegisterRequest request, DeferredResult<ResponseEntity<GenericResponseREST>> result){
        ResponseEntity.ok(authenticationService.registerUser(request));
    }

    @Async
    public void loginUser(LoginRequest request){
        ResponseEntity.ok(authenticationService.loginUser(request));
    }
}
