package com.arcane.convobot.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChattingRequest {
    private String inputText;
    private Integer chatbotId;
}
