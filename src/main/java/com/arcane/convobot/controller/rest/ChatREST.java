package com.arcane.convobot.controller.rest;

import com.arcane.convobot.pojo.request.ChattingRequest;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.ChatService;
import com.arcane.convobot.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatREST {
    private final ChatService chatService;
    @PostMapping("/post-text")
    public ResponseEntity<GenericResponseREST> chat(
            @RequestParam String apiKey,
            @RequestBody ChattingRequest request
    ) {
        try {
            return ResponseEntity.ok(chatService.chat(request, apiKey));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
    @GetMapping("/get-all-chats")
    public ResponseEntity<GenericResponseREST> getAllChatsOfAChatbot(
//            @RequestParam String apiKey,
            @RequestParam Integer chatbotId
    ) {
        try {
            return ResponseEntity.ok(chatService.getAllChatsOfAChatbot(chatbotId));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
}
