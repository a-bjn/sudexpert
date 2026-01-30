package com.backend.sudexpert;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SudexpertApplication {

	public static void main(String[] args) {
		// Load .env file before Spring Boot starts
		loadDotenv();
		// Convert Fly.io DATABASE_URL (postgres://) to Spring datasource properties (jdbc:postgresql://)
		applyFlyDatabaseUrl();
		SpringApplication.run(SudexpertApplication.class, args);
	}

	/**
	 * When running on Fly.io, postgres attach sets DATABASE_URL as postgres://...
	 * Spring Boot needs jdbc:postgresql:// and separate username/password.
	 */
	private static void applyFlyDatabaseUrl() {
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl == null) {
			databaseUrl = System.getProperty("DATABASE_URL");
		}
		if (databaseUrl == null || databaseUrl.startsWith("jdbc:")) {
			return;
		}
		try {
			// postgres://user:password@host:port/dbname -> jdbc:postgresql://host:port/dbname
			String url = databaseUrl;
			if (url.startsWith("postgres://")) {
				url = "jdbc:postgresql://" + url.substring("postgres://".length());
			} else if (url.startsWith("postgresql://")) {
				url = "jdbc:" + url;
			} else {
				return;
			}
			// Parse user:password@host:port/db
			int at = url.indexOf('@');
			if (at == -1) return;
			String userInfo = url.substring("jdbc:postgresql://".length(), at);
			String hostPart = url.substring(at + 1);
			String[] userPass = userInfo.split(":", 2);
			String username = userPass.length > 0 ? userPass[0] : "postgres";
			String password = userPass.length > 1 ? userPass[1] : "";
			// JDBC URL is jdbc:postgresql://host:port/db (no user/pass in URL)
			System.setProperty("spring.datasource.url", "jdbc:postgresql://" + hostPart);
			System.setProperty("spring.datasource.username", username);
			System.setProperty("spring.datasource.password", password);
		} catch (Exception e) {
			System.err.println("Could not parse DATABASE_URL: " + e.getMessage());
		}
	}

	private static void loadDotenv() {
		try {
			Dotenv dotenv = Dotenv.configure()
					.directory("./")
					.ignoreIfMissing()
					.load();
			
			// Load all .env variables into system properties
			// This makes them available to Spring's @Value annotations
			for (DotenvEntry entry : dotenv.entries()) {
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
