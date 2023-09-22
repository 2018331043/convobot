package com.arcane.convobot.controller.rest;


import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.request.ChatbotCreationRequest;
import com.arcane.convobot.pojo.request.ChatbotUpdateRequest;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
public class ChatbotREST {
    private final ChatbotService chatbotService;
    @PostMapping("/create-chatbot")
    public ResponseEntity<GenericResponseREST> createChatbot(
            @RequestBody ChatbotCreationRequest request
    ) {
        try {
            return ResponseEntity.ok(chatbotService.createChatbot(request));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
    @PostMapping("/update-chatbot")
    public ResponseEntity<GenericResponseREST> updateChatbot(
            @RequestBody ChatbotUpdateRequest request
    ) {
        try {
            return ResponseEntity.ok(chatbotService.updateChatbot(request));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }

    @PostMapping("/delete-chatbot/{chatbotId}")
    public ResponseEntity<GenericResponseREST> deleteChatbot(
            @PathVariable Integer chatbotId
    ) {
        try {
            return ResponseEntity.ok(chatbotService.deleteChatbot(chatbotId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
    @GetMapping("/get-all-chatbots")
    public ResponseEntity<List<Chatbot>> getAllChatbots(
    ) {
        return ResponseEntity.ok(chatbotService.getAllChatbots());
    }
}
