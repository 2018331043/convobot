package com.arcane.convobot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ConvobotApplication {
	private static final Logger log = LoggerFactory.getLogger(ConvobotApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(ConvobotApplication.class, args);
		String pattern =
						"  /$$$$$$                                                /$$$$$$$\n" +
						" /$$__  $$                                              | $$__  $$\n" +
						"| $$  \\__/  /$$$$$$  /$$$$$$$  /$$    /$$ /$$$$$$       | $$  \\ $$  /$$$$$$  /$$$$$$\n" +
						"| $$       /$$__  $$| $$__  $$|  $$  /$$//$$__  $$      | $$$$$$$  /$$__  $$|_  $$_/\n" +
						"| $$      | $$  \\ $$| $$  \\ $$ \\  $$/$$/| $$  \\ $$      | $$__  $$| $$  \\ $$  | $$\n" +
						"| $$    $$| $$  | $$| $$  | $$  \\  $$$/ | $$  | $$      | $$  \\ $$| $$  | $$  | $$ /$$\n" +
						"|  $$$$$$/|  $$$$$$/| $$  | $$   \\  $/  |  $$$$$$/      | $$$$$$$/|  $$$$$$/  |  $$$$/\n" +
						" \\______/  \\______/ |__/  |__/    \\_/    \\______/       |_______/  \\______/    \\___/\n";
		System.out.println(pattern);
	}

}
