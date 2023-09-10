package com.arcane.convobot.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
public class ChatCompletionRequest {
    private String model;
    private List<ChatCompletionMessage> messages;
    public ChatCompletionRequest(String model, List<ChatCompletionMessage> messages){
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.addAll(messages);
    }
}
