package com.arcane.convobot.controller.rest;

import com.arcane.convobot.pojo.request.PromptGenerationRequest;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/open-ai")
public class OpenAiREST {
    private final OpenAiService openAiService;
    @PostMapping("/generate-prompt-for-chatbot")
    public ResponseEntity<GenericResponseREST> generatePromptForChatbot(
            @RequestBody PromptGenerationRequest request
    ) {
//        try {
            return ResponseEntity.ok(openAiService.generatePromptForChatbot(request));
//        }catch (Exception e){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
//        }
    }
}
