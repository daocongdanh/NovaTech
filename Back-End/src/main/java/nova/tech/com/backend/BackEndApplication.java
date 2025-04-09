package nova.tech.com.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackEndApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
                .directory(".")
                .filename("local.env")
                .load();

        // Api prefix
        System.setProperty("API_PREFIX", dotenv.get("API_PREFIX"));
        System.setProperty("APP_PORT", dotenv.get("APP_PORT"));

        // Database
        System.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL"));
        System.setProperty("DATABASE_USER", dotenv.get("DATABASE_USER"));
        System.setProperty("DATABASE_PASSWORD", dotenv.get("DATABASE_PASSWORD"));

        // JWT
        System.setProperty("JWT_ACCESS_TOKEN_KEY", dotenv.get("JWT_ACCESS_TOKEN_KEY"));
        System.setProperty("JWT_REFRESH_TOKEN_KEY", dotenv.get("JWT_REFRESH_TOKEN_KEY"));
        System.setProperty("JWT_ACCESS_TOKEN_EXPIRATION", dotenv.get("JWT_ACCESS_TOKEN_EXPIRATION"));
        System.setProperty("JWT_REFRESH_TOKEN_EXPIRATION", dotenv.get("JWT_REFRESH_TOKEN_EXPIRATION"));


        SpringApplication.run(BackEndApplication.class, args);
    }

}
