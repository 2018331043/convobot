package com.arcane.convobot.repo;

import com.arcane.convobot.pojo.Embedding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmbeddingRepository extends JpaRepository<Embedding, Integer> {
    List<Embedding> findAllByChatbotId(Integer chatbotId);
}
