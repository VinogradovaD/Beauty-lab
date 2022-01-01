package com.example.WebApiApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


@EnableAutoConfiguration
@Configuration
@ComponentScan
public class WebApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebApiApplication.class, args);
	}

}
