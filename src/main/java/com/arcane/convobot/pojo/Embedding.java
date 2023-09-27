package com.arcane.convobot.pojo;

import com.arcane.convobot.pojo.request.AttachEmbeddingToChatbotRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Where(clause = "status != -1")
public class Embedding {
    public static final Integer STATUS_DELETED = -1;
    public static final Integer STATUS_ACTIVE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer status;

    private String name;

    private Integer length;

    private Long creationTime;

    private Integer chatbotId;

    @PrePersist
    protected void onCreate() {
        this.status = STATUS_ACTIVE;
        this.creationTime = System.currentTimeMillis();
    }

    public Embedding(AttachEmbeddingToChatbotRequest request){
        this.chatbotId = request.getChatbotId();
        this.name = request.getEmbeddingName();
        this.length = request.getInputText().length();
    }

}
