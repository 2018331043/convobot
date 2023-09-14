package com.arcane.convobot.pojo;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
//TODO add entity annotations to create database table
@AllArgsConstructor
public class ChatThread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String threadName;

    private Integer chatbotId;
    public ChatThread(String threadName, Integer chatbotId){
        this.threadName = threadName;
        this.chatbotId = chatbotId;
    }
}
