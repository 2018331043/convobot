package com.arcane.convobot.controller.rest;

import com.arcane.convobot.pojo.request.AttachEmbeddingToChatbotRequest;
import com.arcane.convobot.pojo.request.AttachWebInfoInChatbotRequest;
import com.arcane.convobot.pojo.request.PromptGenerationRequest;
import com.arcane.convobot.pojo.response.AllEmbeddingOfAChatbotResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.ChatbotService;
import com.arcane.convobot.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/open-ai")
public class OpenAiREST {
    private final OpenAiService openAiService;
    private final ChatbotService chatbotService;
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
    @PostMapping("/enhance-prompt-for-chatbot")
    public ResponseEntity<GenericResponseREST> enhancePromptForChatbot(
            @RequestBody PromptGenerationRequest request
    ) {
//        try {
        return ResponseEntity.ok(openAiService.enhancePromptForChatbot(request));
//        }catch (Exception e){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
//        }
    }
    @PostMapping("/generate-embedding")
    public ResponseEntity<GenericResponseREST> generateEmbeddingForAText(
            @RequestBody String request
    ) {
        try {
            return ResponseEntity.ok(openAiService.callOpenAIAPIToEmbedText(Arrays.asList(request)));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }

    @PostMapping("/attach-embedding-to-chatbot")
    public ResponseEntity<GenericResponseREST> generateEmbeddingForATextAndAttachToAChatbot(
            @RequestBody AttachEmbeddingToChatbotRequest request
            ) {
        try {
            return ResponseEntity.ok(chatbotService.attachEmbeddingToChatbot(request));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }

    @PostMapping("/delete-embedding/{embeddingId}")
    public ResponseEntity<GenericResponseREST> deleteEmbeddingFromAChatbot(
            @PathVariable Integer embeddingId
    ) {
        try {
            return ResponseEntity.ok(chatbotService.deleteEmbeddingFromChatbot(embeddingId));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }

    @PostMapping("/get-all-embedding")
    public ResponseEntity<List<AllEmbeddingOfAChatbotResponse>> getAllEmbeddingOfAChatbot(
            @RequestParam Integer chatbotId
    ) {
            return ResponseEntity.ok(chatbotService.getAllEmbeddingOfChatbot(chatbotId));
    }

    @PostMapping("/attach-web-info-to-chatbot")
    public ResponseEntity<GenericResponseREST> generateEmbeddingForAWebsiteAndAttachToAChatbot(
            @RequestBody AttachWebInfoInChatbotRequest request
    ) {
        try {
            return ResponseEntity.ok(chatbotService.attachWebInfoAsEmbeddingInChatbot(request));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }

}