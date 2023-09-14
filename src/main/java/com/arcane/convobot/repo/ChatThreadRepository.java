package com.arcane.convobot.repo;

import com.arcane.convobot.pojo.ChatThread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatThreadRepository extends JpaRepository<ChatThread, Integer> {
    List<ChatThread> findChatThreadsByChatbotId(Integer chatbotId);
}
