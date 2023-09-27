package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ApiKey;
import com.arcane.convobot.pojo.ChatMessage;
import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.TextEmbedding;
import com.arcane.convobot.pojo.request.ChatCompletionMessage;
import com.arcane.convobot.pojo.request.ChattingRequest;
import com.arcane.convobot.pojo.response.AllChatsOfAChatbotResponse;
import com.arcane.convobot.pojo.response.ChatCompletionResponse;
import com.arcane.convobot.pojo.response.ChattingResponse;
import com.arcane.convobot.repo.ApiKeyRepository;
import com.arcane.convobot.repo.ChatMessageRepository;
import com.arcane.convobot.repo.ChatbotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatbotRepository chatbotRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ApiKeyRepository apiKeyRepository;
    private final OpenAiService openAiService;
    private final APIKeyService apiKeyService;
    @Transactional
    public ChattingResponse chat(ChattingRequest request, String apiKey){

        apiKeyService.checkIfApiIsValid(apiKey);//Access Control

        Chatbot chatbot = chatbotRepository.findById(request.getChatbotId()).orElseGet(()->null);

        List<ChatCompletionMessage> chatMessages = getChatCompletionMessages(request, chatbot);

        chatMessageRepository.save(new ChatMessage(chatbot, "user", request.getInputText()));

        ChatCompletionResponse chatCompletionResponse = openAiService.callOpenAIAPIToGenerateText(chatMessages);
        saveTokensUsedInChat(chatbot, apiKey, chatCompletionResponse);

        chatMessageRepository.save(new ChatMessage(chatbot, "assistant",
                chatCompletionResponse.getChoices().get(0).getMessage().getContent()));
        return new ChattingResponse(chatCompletionResponse.getChoices().get(0).getMessage().getContent());
    }

    public void saveTokensUsedInChat(Chatbot chatbot,String apiKey, ChatCompletionResponse chatCompletionResponse){
        ApiKey apiKeyObject = apiKeyRepository.findApiKeyByValue(apiKey);
        chatbot.setTotalInputTokensSoFar(
                chatbot.getTotalInputTokensSoFar()
                        + chatCompletionResponse.getUsage().getPromptTokens()
        );
        chatbot.setTotalOutputTokensSoFar(
                chatbot.getTotalOutputTokensSoFar()
                        + chatCompletionResponse.getUsage().getCompletionTokens()
        );
        chatbot.setTotalTokensSoFar(
                chatbot.getTotalTokensSoFar()
                        + chatCompletionResponse.getUsage().getTotalTokens()
        );

        apiKeyObject.setTotalInputTokensSoFar(
                apiKeyObject.getTotalInputTokensSoFar()
                        + chatCompletionResponse.getUsage().getPromptTokens()
        );
        apiKeyObject.setTotalOutputTokensSoFar(
                apiKeyObject.getTotalOutputTokensSoFar()
                        + chatCompletionResponse.getUsage().getCompletionTokens()
        );
        apiKeyObject.setTotalTokensSoFar(
                apiKeyObject.getTotalTokensSoFar()
                        + chatCompletionResponse.getUsage().getTotalTokens()
        );
        chatbotRepository.save(chatbot);
    }

    private List<ChatCompletionMessage> getChatCompletionMessages(ChattingRequest request, Chatbot chatbot) {
        Integer rememberance = 2;
        List<ChatCompletionMessage> chatMessages = new ArrayList<>();
        String context = getContext(request, chatbot);
        context = context == null? "" : context;
        chatMessages.add(new ChatCompletionMessage(
                "system",
                chatbot.getPrompt() + chatbot.getRestriction() +
                        "Also use the context below if it is relevant to the questions\n" +
                        "Context: "+ context)
        );
        List<ChatMessage> previousChatMessageList = chatMessageRepository
                .findChatMessagesByChatbotIdAndRoleNotOrderByCreationTimeDesc(chatbot.getId(), "system");

        if(previousChatMessageList != null){
            //TODO add code to perform conversation summarization
            if(previousChatMessageList.size() > rememberance)
                previousChatMessageList = previousChatMessageList.subList(0, rememberance);
            Collections.reverse(previousChatMessageList);
            previousChatMessageList.forEach(chatMessage -> {
                chatMessages.add(new ChatCompletionMessage(chatMessage.getRole(), chatMessage.getContent()));
            });
        }

        chatMessages.add(new ChatCompletionMessage( "user", request.getInputText()));
        return chatMessages;
    }

    private String getContext(ChattingRequest request, Chatbot chatbot) {
        String questionEmbedding = UtilService.generateStringFromAListOfDoubles(
                openAiService.callOpenAIAPIToEmbedText(Arrays.asList(request.getInputText())).getData().get(0).getEmbedding()
        );


        // Query the database to find the most similar text based on embeddings
        String mostSimilarText = openAiService.findMostSimilarText(questionEmbedding, chatbot);

        if (mostSimilarText != null) {
            // Return the text associated with the most similar embeddings
            return mostSimilarText;
        } else {
            return "No matching text found.";
        }
    }


    //TODO complete this method to create a summarization system that reduces the cost of calling open Ai apis
    private List<ChatMessage> getSummaryOfPreviousChatsAndMostRecentChats(
            List<ChatMessage> previousChatMessageList,
            Integer remeberance,
            Chatbot chatbot
    ) {
        List<ChatMessage> chatMessageLimit = new ArrayList<>();
        Boolean summaryFound = false;
        for(ChatMessage chatMessage : previousChatMessageList){
            if(chatMessage.getRole().equals("previousSummary")){
                chatMessageLimit = previousChatMessageList.subList(0, previousChatMessageList.indexOf(chatMessage) + 1);
                summaryFound = true;
                break;
            }
        }
        if(!summaryFound){
            chatMessageLimit = previousChatMessageList;
            if(chatMessageLimit.size() > 10){
                chatMessageLimit = previousChatMessageList.subList(0, 10);
                String previousSummary = openAiService.summarizeConversation(chatMessageLimit);
                chatMessageRepository.save(new ChatMessage(chatbot, "previousSummary", previousSummary));
                chatMessageLimit.add(new ChatMessage(chatbot, "previousSummary", previousSummary));
            }
        }else{
            if(chatMessageLimit.size() > 11){
                chatMessageLimit = previousChatMessageList.subList(0, 10);
                String previousSummary = openAiService.summarizeConversation(chatMessageLimit);
                chatMessageRepository.save(new ChatMessage(chatbot, "previousSummary", previousSummary));
                chatMessageLimit.add(new ChatMessage(chatbot, "previousSummary", previousSummary));
            }
        }
        return chatMessageLimit;
    }

    public AllChatsOfAChatbotResponse getAllChatsOfAChatbot(Integer request){
        List<ChatMessage> chatMessages = chatMessageRepository
                .findChatMessagesByChatbotIdOrderByCreationTimeAsc(request);
        return new AllChatsOfAChatbotResponse(chatMessages);
    }
}
