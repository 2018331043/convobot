package com.arcane.convobot.pojo.response;

import com.arcane.convobot.pojo.ApiKey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class AllApiKeysResponse extends GenericResponseREST{
    List<ApiKeyResponse> apiKeyResponseList;

    public AllApiKeysResponse(List<ApiKey> apiKeyList){
        this.apiKeyResponseList = new ArrayList<>();
        apiKeyList.forEach(apiKey -> {
            this.apiKeyResponseList.add(new ApiKeyResponse(apiKey.getId(), apiKey.getName(), apiKey.getValue()));
        });
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private class ApiKeyResponse{
        private Integer id;
        private String name;
        private String value;
    }
}
