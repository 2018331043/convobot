package com.arcane.convobot.pojo;

import com.arcane.convobot.enums.Role;
import com.arcane.convobot.pojo.request.ChatbotCreationRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
public class Chatbot{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer ownerId;

    private String prompt;

    private String restriction;

    private String description;

    private String name;

    public Chatbot(ChatbotCreationRequest request, Integer ownerId){
        this.ownerId = ownerId;
        this.prompt = request.getPrompt();
        this.restriction = request.getRestriction();
        this.name = request.getChatbotName();
        this.description = request.getDescription();
    }

}
