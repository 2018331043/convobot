package com.arcane.convobot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ConvobotApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConvobotApplication.class, args);
	}

}
