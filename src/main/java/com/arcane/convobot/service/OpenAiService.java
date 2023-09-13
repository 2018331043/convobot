package com.arcane.convobot.service;

import com.arcane.convobot.pojo.request.ChatCompletionMessage;
import com.arcane.convobot.pojo.request.ChatCompletionRequest;
import com.arcane.convobot.pojo.request.PromptGenerationRequest;
import com.arcane.convobot.pojo.response.ChatCompletionResponse;
import com.arcane.convobot.pojo.response.PromptGenerationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OpenAiService {
    @Value("${openapi.apikey}")
    private String apiKey;
    private final RestTemplate restTemplate;

    public PromptGenerationResponse generatePromptForChatbot(PromptGenerationRequest request){
        ChatCompletionResponse chatCompletionResponse = callOpenAIAPIToGenerateText(
                List.of(new ChatCompletionMessage(
                        "system",
                        "Generate prompt for a chatbot that is a " + request.getPromptGenerationRequest()))
        );
        return new PromptGenerationResponse(chatCompletionResponse.getChoices().get(0).getMessage().getContent());
    }

    public ChatCompletionResponse callOpenAIAPIToGenerateText(List<ChatCompletionMessage> messages){
        return callOpenAIAPIToGenerateText(
                "https://api.openai.com/v1/chat/completions",
                messages,
                "gpt-3.5-turbo");
    }

    public ChatCompletionResponse callOpenAIAPIToGenerateText(
            String openAiApiURL,
            List<ChatCompletionMessage> messages,
            String model
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        ChatCompletionRequest requestBody = new ChatCompletionRequest(model,messages);

        URI uri = UriComponentsBuilder.fromHttpUrl(openAiApiURL).build().toUri();
        RequestEntity<ChatCompletionRequest> requestEntity = RequestEntity
                .post(uri)
                .headers(headers)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        // Make the API call
        return restTemplate.exchange(requestEntity, ChatCompletionResponse.class).getBody();
    }
}
