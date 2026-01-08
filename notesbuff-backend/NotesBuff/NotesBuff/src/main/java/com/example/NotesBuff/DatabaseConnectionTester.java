package com.example.NotesBuff;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConnectionTester implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseConnectionTester(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        try {
            jdbcTemplate.execute("SELECT 1");
            System.out.println("\n\n✅ DATABASE CONNECTION SUCCESSFUL: Connected to PostgreSQL\n\n");
        } catch (Exception e) {
            System.err.println("\n\n❌ DATABASE CONNECTION FAILED: " + e.getMessage() + "\n\n");
        }
    }
}