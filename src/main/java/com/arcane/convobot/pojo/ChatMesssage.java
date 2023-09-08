package com.arcane.convobot.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_message")
public class ChatMesssage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer chatbotId;

    private Long creationTime;

    private String role;
    private String content;
    @PrePersist
    protected void onCreate() {
        this.creationTime = System.currentTimeMillis();
    }
}
