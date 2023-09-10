package com.arcane.convobot.controller.rest;


import com.arcane.convobot.pojo.request.ChatbotCreationRequest;
import com.arcane.convobot.pojo.request.ChatbotUpdateRequest;
import com.arcane.convobot.pojo.request.ChattingRequest;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/chat")
    public ResponseEntity<GenericResponseREST> chat(
//            @RequestParam String apiKey,
            @RequestBody ChattingRequest request
    ) {
        try {
            return ResponseEntity.ok(chatbotService.chat(request));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
    @GetMapping("/get-all-chats")
    public ResponseEntity<GenericResponseREST> getAllChatsOfAChatbot(
//            @RequestParam String apiKey,
            @RequestParam Integer chatbotId
    ) {
        try {
            return ResponseEntity.ok(chatbotService.getAllChatsOfAChatbot(chatbotId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
}
