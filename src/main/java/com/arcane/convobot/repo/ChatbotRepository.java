package com.arcane.convobot.repo;

import com.arcane.convobot.pojo.Chatbot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatbotRepository extends JpaRepository<Chatbot, Integer> {
    List<Chatbot> findChatbotsByOwnerId(Integer ownerId);
}
