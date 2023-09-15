package com.arcane.convobot.service;

import com.arcane.convobot.pojo.ApiKey;
import com.arcane.convobot.pojo.response.AllApiKeysResponse;
import com.arcane.convobot.pojo.response.GenericResponseREST;
import com.arcane.convobot.repo.ApiKeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class APIKeyService {
    private final ApiKeyRepository apiKeyRepository;
    private final UserInfoProviderService userInfoProviderService;

    public GenericResponseREST generateApiKey(){
        UUID apiKeyUUID = UUID.randomUUID();
        ApiKey apiKey = new ApiKey(apiKeyUUID.toString(), userInfoProviderService.getRequestUser().getId());
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
    public void checkIfApiIsValid(String requestedKey){
        List<ApiKey> apiKeyList = getAllKeysForAUser();
        Boolean isValidApiKey = false;
        for(ApiKey apiKey : apiKeyList){
            if(apiKey.getValue().equals(requestedKey)) isValidApiKey = true;
        }
        if(!isValidApiKey) throw new RuntimeException("The provided api key is not valid");
    }

}
