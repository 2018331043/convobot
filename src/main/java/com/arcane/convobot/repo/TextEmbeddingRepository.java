package com.arcane.convobot.repo;

import com.arcane.convobot.pojo.TextEmbedding;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TextEmbeddingRepository  extends JpaRepository<TextEmbedding, Integer> {

}
