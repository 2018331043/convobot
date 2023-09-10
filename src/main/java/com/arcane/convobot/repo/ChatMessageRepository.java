package com.arcane.convobot.repo;

import com.arcane.convobot.pojo.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    Optional<ChatMessage> findChatMessageByChatbotIdAndRole(Integer chatbotId, String role);
    List<ChatMessage> findChatMessagesByChatbotIdOrderByCreationTimeAsc(Integer chatbotId);
}
