package com.arcane.convobot.controller.rest;

import com.arcane.convobot.pojo.request.ChattingRequest;
import com.arcane.convobot.pojo.request.CreateThreadRequest;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.service.ThreadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/thread")
public class ThreadREST {
    private final ThreadService threadService;
    @PostMapping("/create-thread")
    public ResponseEntity<GenericResponseREST> chat(
            @RequestBody CreateThreadRequest request
    ) {
        try {
            return ResponseEntity.ok(threadService.createThread(request));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
    @GetMapping("/get-threads-of-a-chat")
    public ResponseEntity<GenericResponseREST> getAllThreadsOfAChatbot(
            @RequestParam Integer chatbotId
    ) {
        try {
            return ResponseEntity.ok(threadService.getAllThreadsOfAChatbot(chatbotId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericResponseREST(e.getMessage()));
        }
    }
}
