package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ChatMessage;
import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.request.ChatCompletionRequest;
import com.arcane.convobot.pojo.request.ChatbotCreationRequest;
import com.arcane.convobot.pojo.request.ChatbotUpdateRequest;
import com.arcane.convobot.pojo.response.ChatCompletionResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.repo.ChatMessageRepository;
import com.arcane.convobot.repo.ChatbotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class ChatbotService {
    private final ChatbotRepository chatbotRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserInfoProviderService userInfoProviderService;
    private final RestTemplate restTemplate;
    @Value("${openapi.apikey}")
    private String apiKey;
    public GenericResponseREST createChatbot(ChatbotCreationRequest request){
        Chatbot chatbot = new Chatbot(request, userInfoProviderService.getRequestUser().getId());
        Chatbot createdChatbot = chatbotRepository.save(chatbot);
        ChatMessage chatMessage = new ChatMessage(createdChatbot, "system",request.getPrompt());
        chatMessageRepository.save(chatMessage);
        return new GenericResponseREST("Chatbot Created");
    }
    public GenericResponseREST updateChatbot(ChatbotUpdateRequest request){
        Chatbot chatbot = chatbotRepository.findById(request.getId()).orElseGet(()->null);
        chatbot.setPrompt(request.getPrompt());
        ChatMessage chatMessage = chatMessageRepository
                .findChatMessageByChatbotIdAndRole(request.getId(), "system").orElseGet(()->null);
        chatMessage.setContent(request.getPrompt());
        chatMessageRepository.save(chatMessage);
        return new GenericResponseREST("Chatbot Updated");
    }
    public ChatCompletionResponse callOpenAIAPIToGenerateText(String prompt) {
        String apiUrl = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        ChatCompletionRequest requestBody = new ChatCompletionRequest(prompt,"gpt-3.5-turbo",null);

        URI uri = UriComponentsBuilder.fromHttpUrl(apiUrl).build().toUri();
        RequestEntity<ChatCompletionRequest> requestEntity = RequestEntity
                .post(uri)
                .headers(headers)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        // Make the API call
        ChatCompletionResponse response = restTemplate.exchange(requestEntity, ChatCompletionResponse.class).getBody();
        return response;
    }
}
