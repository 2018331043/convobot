package com.arcane.convobot.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatbotCreationRequest {
    private String prompt;
    private String restriction;
    private String chatbotName;
    private String description;
    private String model;
}
