package com.arcane.convobot.pojo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromptGenerationResponse extends GenericResponseREST {
    private String generatedPrompt;
}
