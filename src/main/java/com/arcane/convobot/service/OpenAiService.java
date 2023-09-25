package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ChatMessage;
import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.TextEmbedding;
import com.arcane.convobot.pojo.request.ChatCompletionMessage;
import com.arcane.convobot.pojo.request.ChatCompletionRequest;
import com.arcane.convobot.pojo.request.CreateEmbeddingRequest;
import com.arcane.convobot.pojo.request.PromptGenerationRequest;
import com.arcane.convobot.pojo.response.ChatCompletionResponse;
import com.arcane.convobot.pojo.response.CreateEmbeddingResponse;
import com.arcane.convobot.pojo.response.PromptGenerationResponse;
import com.arcane.convobot.repo.TextEmbeddingRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.linear.ArrayRealVector;
import org.apache.commons.math3.linear.RealVector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OpenAiService {
    public static final Integer CONTEXT_LENGTH = 100;
    @Value("${openapi.apikey}")
    private String apiKey;
    private final RestTemplate restTemplate;
    private final TextEmbeddingRepository textEmbeddingRepository;

    public PromptGenerationResponse generatePromptForChatbot(PromptGenerationRequest request){
        String generatePromptStatement = "You are a friendly cooking instructor chatbot." +
                " You teach people how to cook delicious dishes and provide guidance in the kitchen.\n\n" +
                "You provide detailed explanations of cooking techniques and recipes, " +
                "breaking down complex steps into simple instructions. " +
                "You also offer tips on ingredient substitutions and dietary considerations.\n\n" +
                "If users make mistakes in their cooking process or have questions about specific recipes, " +
                "you gently guide them on the right path and offer alternative solutions.\n\n" +
                "Additionally, you share resources such as cooking tutorials, " +
                "recipe websites, and information on essential kitchen tools and equipment to help users" +
                " become better cooks. Your goal is to make cooking enjoyable and accessible for everyone.\n" +
                "Generate a prompt for a chatbot " +
                "that is a " + request.getPromptGenerationRequest() + " like the prompt given above ";
        ChatCompletionResponse chatCompletionResponse = callOpenAIAPIToGenerateText(
                List.of(
                        new ChatCompletionMessage(
                        "system",
                        generatePromptStatement)
                )
        );
        return new PromptGenerationResponse(chatCompletionResponse.getChoices().get(0).getMessage().getContent());
    }

    public String generateGreetingsForChatbot(String prompt){
        String generatePromptStatement = prompt +
                "\nNow Generate a welcome message to start the conversation with the user ";
        ChatCompletionResponse chatCompletionResponse = callOpenAIAPIToGenerateText(
                List.of(
                        new ChatCompletionMessage(
                                "system",
                                generatePromptStatement)
                )
        );
        return chatCompletionResponse.getChoices().get(0).getMessage().getContent();
    }

    public PromptGenerationResponse enhancePromptForChatbot(PromptGenerationRequest request){
        String enhancePromptStatement = "Add more appropriate instructions to the instructions given below for " +
                "a chatbot but dont change the tone \n" +
                request.getPromptGenerationRequest();
        ChatCompletionResponse chatCompletionResponse = callOpenAIAPIToGenerateText(
                List.of(
                        new ChatCompletionMessage(
                                "system",
                                enhancePromptStatement)
                )
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

    public CreateEmbeddingResponse callOpenAIAPIToEmbedText(List<String> chunkedTexts){
        return callOpenAIAPIToEmbedText(
                "https://api.openai.com/v1/embeddings",
                chunkedTexts,
                "text-embedding-ada-002");
    }
    public CreateEmbeddingResponse callOpenAIAPIToEmbedText(
            String openAiApiURL,
            List<String> inputText,
            String model
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        CreateEmbeddingRequest requestBody = new CreateEmbeddingRequest(model, inputText);

        URI uri = UriComponentsBuilder.fromHttpUrl(openAiApiURL).build().toUri();
        RequestEntity<CreateEmbeddingRequest> requestEntity = RequestEntity
                .post(uri)
                .headers(headers)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        // Make the API call
        return restTemplate.exchange(requestEntity, CreateEmbeddingResponse.class).getBody();
    }

    public String summarizeConversation(List<ChatMessage> chatMessageLimit) {
        ObjectMapper objectMapper = new ObjectMapper();
        Collections.reverse(chatMessageLimit);
        List<ChatCompletionMessage> chatCompletionMessages = new ArrayList<>();
        chatMessageLimit.forEach(chatMessage -> {
            chatCompletionMessages.add(new ChatCompletionMessage(chatMessage.getRole(), chatMessage.getContent()));
        });
        String summarizationRequestText = null;
        try {
            summarizationRequestText = "Summarize the following conversation to as short as possible into" +
                    " some key points so that no information is lost: "
                    + objectMapper.writeValueAsString(chatCompletionMessages);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        ChatCompletionResponse chatCompletionResponse = callOpenAIAPIToGenerateText(
                List.of(
                        new ChatCompletionMessage(
                                "system",
                                summarizationRequestText)
                )
        );
        return chatCompletionResponse.getChoices().get(0).getMessage().getContent();
    }
    public String findMostSimilarText(String questionEmbedding, Chatbot chatbot) {
        List<TextEmbedding> allEmbeddings = textEmbeddingRepository.findTextEmbeddingsByChatbotId(chatbot.getId());

        if (allEmbeddings.isEmpty()) {
            return null; // No embeddings in the database
        }

        // Convert question embedding and stored embeddings to RealVector objects
        RealVector questionVector = toRealVector(questionEmbedding);
        List<RealVector> storedVectors = allEmbeddings.stream()
                .map(textEmbedding -> toRealVector(textEmbedding.getEmbedding()))
                .collect(Collectors.toList());
        //Create a list of text with distance from the questio to produce more similar responses by sorting them
        List<TextWithDistances> textWithDistances = new ArrayList<>();
        for (int i = 0; i < storedVectors.size(); i++) {
            Double cosineSimilarity = calculateCosineSimilarity(questionVector, storedVectors.get(i));
            textWithDistances.add(new TextWithDistances(allEmbeddings.get(i).getText(), cosineSimilarity));
        }
        Comparator<TextWithDistances> descendingComparator =
                (obj1, obj2) -> Double.compare(obj2.getDistance(), obj1.getDistance());
        Collections.sort(textWithDistances, descendingComparator);

        String mostSimilarString = "";
        for( TextWithDistances textWithDistances1: textWithDistances){
            mostSimilarString = mostSimilarString.concat(textWithDistances1.getText() + ".");
            //Add upto a certain lenght of character
            if(mostSimilarString.length()>CONTEXT_LENGTH) break;
        }

        return mostSimilarString;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    private class TextWithDistances {
        private String Text;
        private Double distance;
    }
    private RealVector toRealVector(String embedding) {
        // Parse the comma-separated embedding string and convert it to a RealVector
        List<Double> values = Arrays.stream(embedding.split(","))
                .map(Double::parseDouble)
                .collect(Collectors.toList());

        // Create a RealVector from the parsed values
        double[] vectorData = new double[values.size()];
        for (int i = 0; i < values.size(); i++) {
            vectorData[i] = values.get(i);
        }

        return new ArrayRealVector(vectorData);
    }

    private double calculateCosineSimilarity(RealVector vectorA, RealVector vectorB) {
        // Calculate cosine similarity between two vectors
        return vectorA.dotProduct(vectorB) / (vectorA.getNorm() * vectorB.getNorm());
    }

}
