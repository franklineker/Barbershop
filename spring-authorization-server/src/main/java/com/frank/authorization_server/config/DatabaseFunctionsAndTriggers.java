package com.frank.authorization_server.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Configuration
public class DatabaseFunctionsAndTriggers {

    @Bean
    public CommandLineRunner createdAtAndUodatedAtDateSettings(DataSource dataSource) {
        return args -> {
            String createSetTimestampFunctionSQL =
                    "CREATE OR REPLACE FUNCTION set_timestamp() " +
                            "RETURNS TRIGGER AS $$ " +
                            "BEGIN " +
                            "IF (TG_OP = 'INSERT') THEN" +
                            "  NEW.created_at = CURRENT_TIMESTAMP; " +
                            "  NEW.updated_at = NOW();" +
                            "ELSEIF (TG_OP = 'UPDATE') THEN" +
                            "  NEW.updated_at = CURRENT_TIMESTAMP; " +
                            "END IF;" +
                            "RETURN NEW; " +
                            "END; " +
                            "$$ LANGUAGE plpgsql;";

            String createTriggerSQL =
                    "CREATE OR REPLACE TRIGGER update_timestamp_trigger " +
                            "BEFORE INSERT OR UPDATE ON app_user " +
                            "FOR EACH ROW " +
                            "EXECUTE FUNCTION set_timestamp();";

            try (Connection connection = dataSource.getConnection();
                 Statement statement = connection.createStatement()) {

                statement.execute(createSetTimestampFunctionSQL);
                System.out.println("SQL Function created successfully.");

                statement.execute(createTriggerSQL);
                System.out.println("SQL Trigger created successfully.");

            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }

}
