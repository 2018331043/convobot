package com.arcane.convobot.controller.rest;

import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.APIKeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api-key")
public class APIKeyREST {
    private final APIKeyService apiKeyService;
    @PostMapping("/generate-api-key")
    public ResponseEntity<GenericResponseREST> generateApiKey(
    ) {
        return ResponseEntity.ok(apiKeyService.generateApiKey());
    }
    @GetMapping("/get-all-api-keys")
    public ResponseEntity<GenericResponseREST> getAllApiKeys(
    ) {
        return ResponseEntity.ok(apiKeyService.getAllKeysResponseForAUser());
    }
}
