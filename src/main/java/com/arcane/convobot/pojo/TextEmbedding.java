package com.arcane.convobot.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class TextEmbedding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer chatbotId;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(columnDefinition = "TEXT")
    private String embedding;

    public TextEmbedding(Integer chatbotId, String text, String embedding) {
        this.chatbotId = chatbotId;
        this.text = text;
        this.embedding = embedding;
    }

}