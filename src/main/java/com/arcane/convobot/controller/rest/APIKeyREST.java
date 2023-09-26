package com.arcane.convobot.controller.rest;

import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.response.ApiKeyReportResponse;
import com.arcane.convobot.pojo.response.ChatbotReportResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.APIKeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api-key")
public class APIKeyREST {
    private final APIKeyService apiKeyService;
    @PostMapping("/generate-api-key")
    public ResponseEntity<GenericResponseREST> generateApiKey(
            @RequestBody String apikeyName
    ) {
        return ResponseEntity.ok(apiKeyService.generateApiKey(apikeyName));
    }
    @GetMapping("/get-all-api-keys")
    public ResponseEntity<GenericResponseREST> getAllApiKeys(
    ) {
        return ResponseEntity.ok(apiKeyService.getAllKeysResponseForAUser());
    }
    @GetMapping("/get-apikey-report")
    public ResponseEntity<List<ApiKeyReportResponse>> getAllApiKeyReport(
    ) {
        return ResponseEntity.ok(apiKeyService.getAllApiKeyReport());
    }

}
