package com.arcane.convobot.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "api_key")
public class ApiKey {
    public static final Integer STATUS_DELETED = -1;
    public static final Integer STATUS_ACTIVE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String value;

    private Integer ownerId;

    private Integer status;

    @Column(columnDefinition = "DEFAULT 0")
    private Integer totalInputTokensSoFar;

    private Integer totalOutputTokensSoFar;

    private Integer totalTokensSoFar;

    @PrePersist
    protected void onCreate() {
        this.status = STATUS_ACTIVE;
    }

    public ApiKey(String value, Integer ownerId, String name){
        this.value = value;
        this.ownerId = ownerId;
        this.name = name;
        this.totalInputTokensSoFar = 0;
        this.totalOutputTokensSoFar = 0;
        this.totalTokensSoFar = 0;
    }
}
