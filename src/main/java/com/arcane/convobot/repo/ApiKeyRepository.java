package com.arcane.convobot.repo;

import com.arcane.convobot.pojo.ApiKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiKeyRepository extends JpaRepository<ApiKey, Integer> {
    List<ApiKey> findApiKeyByOwnerIdAndStatus(Integer ownerId, Integer status);
    ApiKey findApiKeyByValue(String value);
}
