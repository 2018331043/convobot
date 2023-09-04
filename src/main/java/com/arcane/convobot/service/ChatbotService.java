package com.arcane.convobot.service;

import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.request.ChatCompletionRequest;
import com.arcane.convobot.pojo.request.ChatbotCreationRequest;
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
    public String callOpenAIAPIToGenerateText(String prompt) {
//        String apiUrl = "https://api.openai.com/v1/chat/completions"; // Replace with the appropriate OpenAI API URL
        String apiUrl = "https://api.openai.com/v1/chat/completions"; // Replace with the appropriate OpenAI API URL

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        // Build the request body
        ChatCompletionRequest requestBody = new ChatCompletionRequest(prompt,"gpt-3.5-turbo",null);

        // Build the API request
        URI uri = UriComponentsBuilder.fromHttpUrl(apiUrl).build().toUri();
        RequestEntity<ChatCompletionRequest> requestEntity = RequestEntity
                .post(uri)
                .headers(headers)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        // Make the API call
        String response = restTemplate.exchange(requestEntity, String.class).getBody();
        return response;
    }
}
