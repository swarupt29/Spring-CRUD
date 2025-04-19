package com.crud;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.context.ServletWebServerInitializedEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class CrudApplication {
	
	private static final Logger logger = LoggerFactory.getLogger(CrudApplication.class);
	
	public static void main(String[] args) {
		logger.info("program started");
		SpringApplication.run(CrudApplication.class, args);
	}
	
	@EventListener
	public void onApplicationEvent(ServletWebServerInitializedEvent event) {
		int port = event.getWebServer().getPort();
		logger.info("success, default endpoint: http://localhost:{}", port);
	}
}