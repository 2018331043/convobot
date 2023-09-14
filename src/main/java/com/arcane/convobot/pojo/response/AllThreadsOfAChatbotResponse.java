package com.arcane.convobot.pojo.response;

import com.arcane.convobot.pojo.ChatThread;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class AllThreadsOfAChatbotResponse extends GenericResponseREST{
    List<ChatThreadUnitResponse> allThreadsOfAChatBot;
    public AllThreadsOfAChatbotResponse(List<ChatThread> chatThreadList){
        this.allThreadsOfAChatBot = new ArrayList<>();
        chatThreadList.forEach(chatThread -> {
            this.allThreadsOfAChatBot.add(new ChatThreadUnitResponse( chatThread.getThreadName(), chatThread.getChatbotId()));
        });
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ChatThreadUnitResponse extends ChatThreadCreationResponse{
        private String chatThreadName;
        public  ChatThreadUnitResponse(String chatThreadName, Integer chatThreadId){
            this.chatThreadName = chatThreadName;
            this.setChatThreadId(chatThreadId);
        }
    }
}
