package com.arcane.convobot.pojo.response;

import com.arcane.convobot.pojo.ChatMessage;
import com.arcane.convobot.pojo.request.ChatCompletionMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class AllChatsOfAChatbotResponse extends GenericResponseREST{
    private List<ChatCompletionMessage> messages;
    public AllChatsOfAChatbotResponse(List<ChatMessage> chatCompletionMessages){
        this.messages = new ArrayList<>();
        chatCompletionMessages.forEach(chat->{
            this.messages.add(new ChatCompletionMessage(chat.getRole(), chat.getContent()));
        });
    }
}
