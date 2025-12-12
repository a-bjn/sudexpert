package com.backend.sudexpert;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Map;

@SpringBootApplication
public class SudexpertApplication {

	public static void main(String[] args) {
		// Load .env file before Spring Boot starts
		loadDotenv();
		
		SpringApplication.run(SudexpertApplication.class, args);
	}

	private static void loadDotenv() {
		try {
			Dotenv dotenv = Dotenv.configure()
					.directory("./")
					.ignoreIfMissing()
					.load();
			
			// Load all .env variables into system properties
			// This makes them available to Spring's @Value annotations
			Map<String, String> envMap = dotenv.entries();
			for (Map.Entry<String, String> entry : envMap.entrySet()) {
				String key = entry.getKey();
				String value = entry.getValue();
				// Only set if not already set as system property (system properties take precedence)
				if (System.getProperty(key) == null && System.getenv(key) == null) {
					System.setProperty(key, value);
				}
			}
		} catch (Exception e) {
			// .env file is optional, so we just log and continue
			System.out.println("Note: .env file not found or could not be loaded. Using system environment variables and defaults.");
		}
	}
}
