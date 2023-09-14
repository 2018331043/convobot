package com.arcane.convobot.pojo.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateThreadRequest {
    private String threadName;
    private Integer chatbotId;
}
