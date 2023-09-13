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
    private ApiKeyRepository apiKeyRepository;
    private UserInfoProviderService userInfoProviderService;

    public GenericResponseREST generateApiKey(){
        UUID apiKeyUUID = UUID.randomUUID();
        ApiKey apiKey = new ApiKey(apiKeyUUID.toString(), userInfoProviderService.getRequestUser().getId());
        apiKeyRepository.save(apiKey);
        return new GenericResponseREST("Created Api Key Successfully");
    }

    public AllApiKeysResponse getAllKeysForAUser(){
        List<ApiKey> apiKeyList = apiKeyRepository
                .findApiKeyByOwnerIdAndStatus(userInfoProviderService.getRequestUser().getId(), ApiKey.STATUS_ACTIVE);
        return new AllApiKeysResponse(apiKeyList);
    }

}
