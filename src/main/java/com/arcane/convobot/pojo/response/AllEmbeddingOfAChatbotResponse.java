package com.arcane.convobot.pojo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AllEmbeddingOfAChatbotResponse{
    private Integer embeddingId;
    private String embeddingName;
    private Integer embeddingLength;
}
