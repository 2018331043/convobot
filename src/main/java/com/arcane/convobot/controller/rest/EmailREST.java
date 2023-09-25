package com.arcane.convobot.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.arcane.convobot.service.EmailService;


@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailREST {
    private final EmailService emailService;
    @PostMapping("/send")
    public String sendEmail() {
        try {
            emailService.sendEmail("mahnurrahman14@gmail.com", "Testing", "This is a test");
            return "Email sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email.";
        }
    }
    @GetMapping("/{token}")
    public String verifyEmail(
            @PathVariable String token
    ) {
        try {
            return "Email verified successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email.";
        }
    }
}
