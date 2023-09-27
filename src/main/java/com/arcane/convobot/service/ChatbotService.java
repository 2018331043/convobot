package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ChatMessage;
import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.Embedding;
import com.arcane.convobot.pojo.TextEmbedding;
import com.arcane.convobot.pojo.request.*;
import com.arcane.convobot.pojo.response.ChatbotReportResponse;
import com.arcane.convobot.pojo.response.CreateEmbeddingResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.repo.ChatMessageRepository;
import com.arcane.convobot.repo.ChatbotRepository;
import com.arcane.convobot.repo.EmbeddingRepository;
import com.arcane.convobot.repo.TextEmbeddingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatbotService {
    private final ChatbotRepository chatbotRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final TextEmbeddingRepository textEmbeddingRepository;
    private final EmbeddingRepository embeddingRepository;
    private final UserInfoProviderService userInfoProviderService;
    private final WebCrawlerService webCrawlerService;
    private final OpenAiService openAiService;

    @Transactional
    public GenericResponseREST createChatbot(ChatbotCreationRequest request){
        Chatbot chatbot = new Chatbot(request, userInfoProviderService.getRequestUser().getId());
        Chatbot createdChatbot = chatbotRepository.save(chatbot);
        ChatMessage chatMessage1 = new ChatMessage(createdChatbot, "system",request.getPrompt());
        chatMessageRepository.save(chatMessage1);
        ChatMessage chatMessage2 = new ChatMessage(
                createdChatbot,
                "assistant",
                openAiService.generateGreetingsForChatbot(request.getPrompt())
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

    public GenericResponseREST attachWebInfoAsEmbeddingInChatbot(AttachWebInfoInChatbotRequest request){
        String textToEmbed = webCrawlerService.getAllTextDataFromAWebPage(request.getUrl());
        return attachEmbeddingToChatbot(request.getChatbotId(), textToEmbed);
    }

    //Method overloading to serve text embedding and web embedding both purposes
    @Transactional
    public GenericResponseREST attachEmbeddingToChatbot(Integer chatbotId, String inputText) {
        List<String> chunkedTexts = UtilService.generateStringsFromText(inputText);
        CreateEmbeddingResponse createEmbeddingResponse = openAiService.callOpenAIAPIToEmbedText(chunkedTexts);

        createEmbeddingResponse.getData().forEach((embeddingData -> {
            String doubleListAsString = UtilService
                    .generateStringFromAListOfDoubles(embeddingData.getEmbedding());

            TextEmbedding textEmbedding = new TextEmbedding(
                    chatbotId,
                    chunkedTexts.get(createEmbeddingResponse.getData().indexOf(embeddingData)),
                    doubleListAsString,
                    null
            );

            textEmbeddingRepository.save(textEmbedding);
        }));

        return new GenericResponseREST("Successfully Added Data to your chatbot");
    }

    @Transactional
    public GenericResponseREST deleteEmbeddingFromChatbot(Integer embeddingId) {
        Embedding embedding = embeddingRepository.findById(embeddingId)
                .orElseThrow(()-> new RuntimeException("Embedding Not Found"));
        embedding.setStatus(Embedding.STATUS_DELETED);
        List<TextEmbedding> textEmbeddingList = textEmbeddingRepository.findTextEmbeddingsByEmbeddingId(embeddingId);
        textEmbeddingList.forEach(textEmbedding -> {
            textEmbedding.setStatus(TextEmbedding.STATUS_DELETED);
        });
        textEmbeddingRepository.saveAll(textEmbeddingList);
        return new GenericResponseREST("Successfully Deleted Data from your chatbot");
    }

    @Transactional
    public GenericResponseREST attachEmbeddingToChatbot(AttachEmbeddingToChatbotRequest request) {
        Embedding embedding = new Embedding(request);
        Embedding newEmbedding = embeddingRepository.save(embedding);
        List<String> chunkedTexts = UtilService.generateStringsFromText(request.getInputText());
        CreateEmbeddingResponse createEmbeddingResponse = openAiService.callOpenAIAPIToEmbedText(chunkedTexts);

        createEmbeddingResponse.getData().forEach((embeddingData -> {
            String doubleListAsString = UtilService
                    .generateStringFromAListOfDoubles(embeddingData.getEmbedding());

            TextEmbedding textEmbedding = new TextEmbedding(
                    request.getChatbotId(),
                    chunkedTexts.get(createEmbeddingResponse.getData().indexOf(embeddingData)),
                    doubleListAsString,
                    newEmbedding.getId()
            );

            textEmbeddingRepository.save(textEmbedding);
        }));

        return new GenericResponseREST("Successfully Added Data to your chatbot");
    }

    public List<ChatbotReportResponse> getAllChatbotReport() {
        List<Chatbot> chatbotList = getAllChatbots();
        List<ChatbotReportResponse> chatbotReportResponseList = new ArrayList<>();
        chatbotList.forEach(chatbot -> {
            chatbotReportResponseList.add(new ChatbotReportResponse(chatbot));
        });
        return chatbotReportResponseList;
    }
}
