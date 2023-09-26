package com.arcane.convobot.pojo.response;

import com.arcane.convobot.pojo.Chatbot;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatbotReportResponse {
    private Integer chatbotId;
    private String chatbotName;
    private String prompt;
    private String restrictions;
    private String description;
    private Integer totalInputTokensSoFar;
    private Integer totalOutputTokensSoFar;
    private Integer totalTokensSoFar;
    public ChatbotReportResponse(Chatbot chatbot) {
        this.chatbotId = chatbot.getId();
        this.chatbotName = chatbot.getName();
        this.prompt = chatbot.getPrompt();
        this.restrictions = chatbot.getRestriction();
        this.description = chatbot.getDescription();
        this.totalInputTokensSoFar = chatbot.getTotalInputTokensSoFar();
        this.totalOutputTokensSoFar = chatbot.getTotalOutputTokensSoFar();
        this.totalTokensSoFar = chatbot.getTotalTokensSoFar();
    }
}
