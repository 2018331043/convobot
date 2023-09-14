package com.arcane.convobot.pojo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatThreadCreationResponse extends GenericResponseREST{
    private Integer chatThreadId;
}
