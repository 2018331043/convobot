package com.arcane.convobot.service;

import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.request.ChatCompletionRequest;
import com.arcane.convobot.pojo.request.ChatbotCreationRequest;
import com.arcane.convobot.pojo.response.ChatCompletionResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.repo.ChatbotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class ChatbotService {
    private final ChatbotRepository chatbotRepository;
    private final UserInfoProviderService userInfoProviderService;
    private final RestTemplate restTemplate;
    @Value("${openapi.apikey}")
    private String apiKey;
    public GenericResponseREST createChatbot(ChatbotCreationRequest request){
        Chatbot chatbot = new Chatbot(request, userInfoProviderService.getRequestUser().getId());
        chatbotRepository.save(chatbot);
        callOpenAIAPIToGenerateText(request.getPrompt());
        return new GenericResponseREST("Chatbot Created");
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
