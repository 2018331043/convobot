package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ApiKey;
import com.arcane.convobot.pojo.Chatbot;
import com.arcane.convobot.pojo.request.ChattingRequest;
import com.arcane.convobot.pojo.response.AllApiKeysResponse;
import com.arcane.convobot.pojo.response.ApiKeyReportResponse;
import com.arcane.convobot.pojo.response.ChatbotReportResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.repo.ApiKeyRepository;
import com.arcane.convobot.repo.ChatbotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class APIKeyService {
    private final ApiKeyRepository apiKeyRepository;
    private final ChatbotRepository chatbotRepository;
    private final UserInfoProviderService userInfoProviderService;

    public GenericResponseREST generateApiKey(String keyName){
        UUID apiKeyUUID = UUID.randomUUID();
        ApiKey apiKey = new ApiKey(apiKeyUUID.toString(), userInfoProviderService.getRequestUser().getId(), keyName);
        apiKeyRepository.save(apiKey);
        return new GenericResponseREST("Created Api Key Successfully");
    }

    public AllApiKeysResponse getAllKeysResponseForAUser(){
        List<ApiKey> apiKeyList = getAllKeysForAUser();
        return new AllApiKeysResponse(apiKeyList);
    }
    public List<ApiKey> getAllKeysForAUser(){
        return apiKeyRepository
                .findApiKeyByOwnerIdAndStatus(userInfoProviderService.getRequestUser().getId(), ApiKey.STATUS_ACTIVE);

    }
    public void checkIfApiIsValid(String requestedKey, ChattingRequest chattingRequest){
//        List<ApiKey> apiKeyList = getAllKeysForAUser();
        ApiKey apiKey = apiKeyRepository.findApiKeyByValue(requestedKey);
//        Boolean isValidApiKey = false;
//        for(ApiKey apiKey : apiKeyList){
//            if(apiKey.getValue().equals(requestedKey)) isValidApiKey = true;
//        }
        if(apiKey == null) throw new RuntimeException("The provided api key is not valid");
        else{
            Chatbot chatbot = chatbotRepository.findById(chattingRequest.getChatbotId()).orElseThrow(()->new RuntimeException("Chatbot Not Found"));
            if(!chatbot.getOwnerId().equals(apiKey.getOwnerId()))throw new RuntimeException("You are not authorized to access this chatbot");
        }
    }

    public List<ApiKeyReportResponse> getAllApiKeyReport() {
        List<ApiKey> apiKeyList = getAllKeysForAUser();
        List<ApiKeyReportResponse> apiKeyReportResponseList = new ArrayList<>();
        apiKeyList.forEach(apiKey -> {
            apiKeyReportResponseList.add(new ApiKeyReportResponse(apiKey));
        });
        return apiKeyReportResponseList;
    }
}
