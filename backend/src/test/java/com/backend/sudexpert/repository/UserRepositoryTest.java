package com.backend.sudexpert.repository;

import com.backend.sudexpert.domain.Role;
import com.backend.sudexpert.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByEmail_WhenUserExists_ShouldReturnUser() {
        User user = User.builder()
                .email("test@example.com")
                .password("password")
                .firstName("John")
                .lastName("Doe")
                .role(Role.USER)
                .build();
        entityManager.persist(user);
        entityManager.flush();

        Optional<User> foundUser = userRepository.findByEmail("test@example.com");

        assertTrue(foundUser.isPresent());
        assertEquals("test@example.com", foundUser.get().getEmail());
        assertEquals("John", foundUser.get().getFirstName());
    }

    @Test
    void findByEmail_WhenUserDoesNotExist_ShouldReturnEmpty() {
        Optional<User> foundUser = userRepository.findByEmail("nonexistent@example.com");

        assertFalse(foundUser.isPresent());
    }

    @Test
    void save_ShouldPersistUser() {
        User user = User.builder()
                .email("new@example.com")
                .password("password123")
                .firstName("Jane")
                .lastName("Smith")
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
        assertEquals("new@example.com", savedUser.getEmail());
        assertEquals("Jane", savedUser.getFirstName());
        assertEquals(Role.USER, savedUser.getRole());
    }

    @Test
    void save_WithUniqueEmail_ShouldSucceed() {
        User user1 = User.builder()
                .email("user1@example.com")
                .password("password")
                .role(Role.USER)
                .build();

        User user2 = User.builder()
                .email("user2@example.com")
                .password("password")
                .role(Role.USER)
                .build();

        User savedUser1 = userRepository.save(user1);
        User savedUser2 = userRepository.save(user2);

        assertNotNull(savedUser1.getId());
        assertNotNull(savedUser2.getId());
        assertNotEquals(savedUser1.getId(), savedUser2.getId());
    }
}

