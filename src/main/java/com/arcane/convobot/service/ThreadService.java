package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ChatThread;
import com.arcane.convobot.pojo.request.CreateThreadRequest;
import com.arcane.convobot.pojo.response.AllThreadsOfAChatbotResponse;
import com.arcane.convobot.pojo.response.ChatThreadCreationResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.repo.ChatThreadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ThreadService {
    private final ChatThreadRepository chatThreadRepository;
    public ChatThreadCreationResponse createThread(CreateThreadRequest request){
        ChatThread chatThread = chatThreadRepository.save(
                new ChatThread(request.getThreadName(), request.getChatbotId())
        );
        return new ChatThreadCreationResponse(chatThread.getId());
    }
    public AllThreadsOfAChatbotResponse getAllThreadsOfAChatbot(Integer chatbotId){
        List<ChatThread> chatThreadList = chatThreadRepository.findChatThreadsByChatbotId(chatbotId);
        return new AllThreadsOfAChatbotResponse(chatThreadList);
    }
}
