package com.arcane.convobot.pojo.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatCompletionResponse {
    private static final long serialVersionUID = 1L; // A unique identifier for the class

    private String id;
    private String object;
    private Long created;
    private String model;
    private Usage usage;
    private List<Choice> choices;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Usage implements Serializable {
        @JsonProperty("prompt_tokens")
        private Integer promptTokens;
        @JsonProperty("completion_tokens")
        private Integer completionTokens;
        @JsonProperty("total_tokens")
        private Integer totalTokens;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Choice implements Serializable {
        private Message message;
        @JsonProperty("finish_reason")
        private String finishReason;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Message implements Serializable {
        private String role;
        private String content;

    }
}