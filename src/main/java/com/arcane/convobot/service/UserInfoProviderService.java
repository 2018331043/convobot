package com.arcane.convobot.service;

import com.arcane.convobot.pojo.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoProviderService {
    public User getRequestUser() {
        try {
            return   (User) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();
        }catch (Exception e){
            return null;
        }
    }
}
