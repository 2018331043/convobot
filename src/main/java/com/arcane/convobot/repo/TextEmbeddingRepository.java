package com.arcane.convobot.repo;

import com.arcane.convobot.pojo.TextEmbedding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TextEmbeddingRepository  extends JpaRepository<TextEmbedding, Integer> {
    List<TextEmbedding> findTextEmbeddingsByChatbotId(Integer chatbotId);
}
