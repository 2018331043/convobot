package com.arcane.convobot.pojo.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEmbeddingResponse extends GenericResponseREST{
    @JsonProperty("object")
    private String object;

    @JsonProperty("data")
    private List<EmbeddingData> data;

    @JsonProperty("model")
    private String model;

    @JsonProperty("usage")
    private UsageInfo usage;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmbeddingData {
        @JsonProperty("object")
        private String object;

        @JsonProperty("embedding")
        private List<Double> embedding;

        @JsonProperty("index")
        private int index;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UsageInfo {
        @JsonProperty("prompt_tokens")
        private int promptTokens;

        @JsonProperty("total_tokens")
        private int totalTokens;
    }
}
