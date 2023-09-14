package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ChatMessage;
import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.request.ChatCompletionMessage;
import com.arcane.convobot.pojo.request.ChattingRequest;
import com.arcane.convobot.pojo.response.AllChatsOfAChatbotResponse;
import com.arcane.convobot.pojo.response.ChatCompletionResponse;
import com.arcane.convobot.pojo.response.ChattingResponse;
import com.arcane.convobot.repo.ChatMessageRepository;
import com.arcane.convobot.repo.ChatbotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatbotRepository chatbotRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final OpenAiService openAiService;
    private final APIKeyService apiKeyService;
    @Transactional
    public ChattingResponse chat(ChattingRequest request, String apiKey){
        apiKeyService.checkIfApiIsValid(apiKey);
        //TODO make the chat stateful
        Chatbot chatbot = chatbotRepository.findById(request.getChatbotId()).orElseGet(()->null);

        List<ChatCompletionMessage> chatMessages = getChatCompletionMessages(request, chatbot);

        chatMessageRepository.save(new ChatMessage(chatbot, "user", request.getInputText()));

        ChatCompletionResponse chatCompletionResponse = openAiService.callOpenAIAPIToGenerateText(chatMessages);
        chatMessageRepository.save(new ChatMessage(chatbot, "assistant",
                chatCompletionResponse.getChoices().get(0).getMessage().getContent()));
        return new ChattingResponse(chatCompletionResponse.getChoices().get(0).getMessage().getContent());
    }

    private List<ChatCompletionMessage> getChatCompletionMessages(ChattingRequest request, Chatbot chatbot) {
        Integer rememberance = 2;
        List<ChatCompletionMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatCompletionMessage(
                "system",
                chatbot.getPrompt() + chatbot.getRestriction())
        );
        List<ChatMessage> previousChatMessageList = chatMessageRepository
                .findChatMessagesByChatbotIdOrderByCreationTimeDesc(chatbot.getId());

        if(previousChatMessageList != null){
            if(previousChatMessageList.size() > rememberance)
                previousChatMessageList = previousChatMessageList.subList(0,2);
            previousChatMessageList.forEach(chatMessage -> {
                chatMessages.add(new ChatCompletionMessage(chatMessage.getRole(), chatMessage.getContent()));
            });
        }

        chatMessages.add(new ChatCompletionMessage( "user", request.getInputText()));
        return chatMessages;
    }

    public AllChatsOfAChatbotResponse getAllChatsOfAChatbot(Integer request){
        List<ChatMessage> chatMessages = chatMessageRepository
                .findChatMessagesByChatbotIdOrderByCreationTimeAsc(request);
        return new AllChatsOfAChatbotResponse(chatMessages);
    }
}
