package com.arcane.convobot.pojo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChattingResponse extends GenericResponseREST{
    private String outputText;
}
