package com.arcane.convobot.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttachEmbeddingToChatbotRequest {
    private Integer chatbotId;
    private String inputText;
    private String embeddingName;
}
