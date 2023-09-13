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

    private String value;

    private Integer ownerId;

    private Integer status;

    @PrePersist
    protected void onCreate() {
        this.status = STATUS_ACTIVE;
    }

    public ApiKey(String value, Integer ownerId){
        this.value = value;
        this.ownerId = ownerId;
    }
}
