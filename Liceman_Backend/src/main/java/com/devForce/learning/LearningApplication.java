package com.devForce.learning;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@Slf4j
@SpringBootApplication
public class LearningApplication {


	public static void main(String[] args) {
		SpringApplication.run(LearningApplication.class, args);
	}


	@Bean
	public CommandLineRunner initData() {

		System.out.println("Hola crack, llegaste");

		return (args) -> {

		};
	}
}

