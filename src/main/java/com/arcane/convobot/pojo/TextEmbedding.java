package com.arcane.convobot.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "status != -1")
public class TextEmbedding {
    public static final Integer STATUS_DELETED = -1;
    public static final Integer STATUS_ACTIVE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer chatbotId;

    private Integer embeddingId;

    private Integer status;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(columnDefinition = "TEXT")
    private String embedding;

    @PrePersist
    protected void onCreate() {
        this.status = STATUS_ACTIVE;
    }

    public TextEmbedding(Integer chatbotId, String text, String embedding, Integer embeddingId) {
        this.chatbotId = chatbotId;
        this.text = text;
        this.embedding = embedding;
        this.embeddingId = embeddingId;
    }

}