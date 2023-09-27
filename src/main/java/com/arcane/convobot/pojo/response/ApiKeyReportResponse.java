package com.arcane.convobot.pojo.response;

import com.arcane.convobot.pojo.ApiKey;
import com.arcane.convobot.pojo.Chatbot;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiKeyReportResponse {
    private Integer id;
    private String apiKeyName;
    private String value;
    private Integer totalInputTokensSoFar;
    private Integer totalOutputTokensSoFar;
    private Integer totalTokensSoFar;
    public ApiKeyReportResponse(ApiKey apiKey) {
        this.id = apiKey.getId();
        this.apiKeyName = apiKey.getName();
        this.value = apiKey.getValue();
        this.totalInputTokensSoFar = apiKey.getTotalInputTokensSoFar();
        this.totalOutputTokensSoFar = apiKey.getTotalOutputTokensSoFar();
        this.totalTokensSoFar = apiKey.getTotalTokensSoFar();
    }
}
