package com.arcane.convobot.pojo;

import com.arcane.convobot.enums.Role;
import com.arcane.convobot.pojo.request.ChatbotCreationRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chatbot")
@Where(clause = "status = 1")
public class Chatbot{
    public static final Integer STATUS_DELETED = -1;
    public static final Integer STATUS_ACTIVE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer ownerId;

    private Integer embeddingId;

    private Integer status;

    @Column(length = 7000)
    private String prompt;

    @Column(length = 7000)
    private String restriction;

    private String description;

    private String name;

    private Integer totalInputTokensSoFar;

    private Integer totalOutputTokensSoFar;

    private Integer totalTokensSoFar;

    @PrePersist
    protected void onCreate() {
        this.status = STATUS_ACTIVE;
    }

    public Chatbot(ChatbotCreationRequest request, Integer ownerId){
        this.ownerId = ownerId;
        this.prompt = request.getPrompt();
        this.restriction = request.getRestriction();
        this.name = request.getChatbotName();
        this.description = request.getDescription();
    }

}
