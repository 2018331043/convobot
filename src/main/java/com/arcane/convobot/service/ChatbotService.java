package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ChatMessage;
import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.request.*;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.repo.ChatMessageRepository;
import com.arcane.convobot.repo.ChatbotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatbotService {
    private final ChatbotRepository chatbotRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserInfoProviderService userInfoProviderService;
    private final OpenAiService openAiService;
    public GenericResponseREST createChatbot(ChatbotCreationRequest request){
        Chatbot chatbot = new Chatbot(request, userInfoProviderService.getRequestUser().getId());
        Chatbot createdChatbot = chatbotRepository.save(chatbot);
        ChatMessage chatMessage1 = new ChatMessage(createdChatbot, "system",request.getPrompt() + request.getRestriction());
        chatMessageRepository.save(chatMessage1);
        ChatMessage chatMessage2 = new ChatMessage(
                createdChatbot,
                "assistant",
                openAiService.generateGreetingsForChatbot(request.getPrompt())+request.getRestriction()
        );
        chatMessageRepository.save(chatMessage2);
        return new GenericResponseREST("Chatbot Created");
    }
    public GenericResponseREST updateChatbot(ChatbotUpdateRequest request){
        Chatbot chatbot = chatbotRepository.findById(request.getId())
                .orElseThrow(()->new RuntimeException("The requested chatbot was not found"));
        chatbot.setPrompt(request.getPrompt());
        chatbot.setRestriction(request.getRestriction());

        ChatMessage chatMessage = chatMessageRepository
                .findChatMessageByChatbotIdAndRole(request.getId(), "system").orElseGet(()->null);
        chatMessage.setContent(request.getPrompt() + request.getRestriction());
        chatMessageRepository.save(chatMessage);

        return new GenericResponseREST("Chatbot Updated");
    }
    public GenericResponseREST deleteChatbot(Integer chatbotId){
        Chatbot chatbot = chatbotRepository.findById(chatbotId)
                .orElseThrow(()->new RuntimeException("The requested chatbot was not found"));
        chatbot.setStatus(Chatbot.STATUS_DELETED);
        chatbotRepository.save(chatbot);

        return new GenericResponseREST("Chatbot deleted");
    }

    public List<Chatbot> getAllChatbots(){
        return chatbotRepository.findChatbotsByOwnerId(userInfoProviderService.getRequestUser().getId());
    }
}
