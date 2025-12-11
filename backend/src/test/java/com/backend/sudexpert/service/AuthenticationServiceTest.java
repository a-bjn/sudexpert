package com.backend.sudexpert.service;

import com.backend.sudexpert.config.JwtService;
import com.backend.sudexpert.domain.Role;
import com.backend.sudexpert.domain.User;
import com.backend.sudexpert.dto.AuthenticationRequest;
import com.backend.sudexpert.dto.AuthenticationResponse;
import com.backend.sudexpert.dto.RegisterRequest;
import com.backend.sudexpert.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegisterRequest registerRequest;
    private AuthenticationRequest authenticationRequest;
    private User testUser;

    @BeforeEach
    void setUp() {
        registerRequest = RegisterRequest.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .build();

        authenticationRequest = AuthenticationRequest.builder()
                .email("john.doe@example.com")
                .password("password123")
                .build();

        testUser = User.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();
    }

    @Test
    void register_ShouldCreateUserAndReturnToken() {
        // Arrange
        String expectedToken = "jwt.token.here";
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtService.generateToken(any(User.class))).thenReturn(expectedToken);

        // Act
        AuthenticationResponse response = authenticationService.register(registerRequest);

        // Assert
        assertNotNull(response);
        assertEquals(expectedToken, response.getToken());
        verify(passwordEncoder, times(1)).encode("password123");
        verify(userRepository, times(1)).save(any(User.class));
        verify(jwtService, times(1)).generateToken(any(User.class));
    }

    @Test
    void register_ShouldSetUserRoleToUSER() {
        // Arrange
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            assertEquals(Role.USER, user.getRole());
            return user;
        });
        when(jwtService.generateToken(any(User.class))).thenReturn("token");

        // Act
        authenticationService.register(registerRequest);

        // Assert
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_ShouldEncodePassword() {
        // Arrange
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            assertEquals("encodedPassword", user.getPassword());
            return user;
        });
        when(jwtService.generateToken(any(User.class))).thenReturn("token");

        // Act
        authenticationService.register(registerRequest);

        // Assert
        verify(passwordEncoder, times(1)).encode("password123");
    }

    @Test
    void authenticate_WhenCredentialsValid_ShouldReturnToken() {
        // Arrange
        String expectedToken = "jwt.token.here";
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(testUser)).thenReturn(expectedToken);

        // Act
        AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);

        // Assert
        assertNotNull(response);
        assertEquals(expectedToken, response.getToken());
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, times(1)).findByEmail("john.doe@example.com");
        verify(jwtService, times(1)).generateToken(testUser);
    }

    @Test
    void authenticate_ShouldCallAuthenticationManager() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(any(User.class))).thenReturn("token");

        // Act
        authenticationService.authenticate(authenticationRequest);

        // Assert
        verify(authenticationManager, times(1)).authenticate(
                argThat(auth -> 
                    auth.getPrincipal().equals("john.doe@example.com") &&
                    auth.getCredentials().equals("password123")
                )
        );
    }

    @Test
    void authenticate_WhenUserNotFound_ShouldThrowException() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(Exception.class, () -> {
            authenticationService.authenticate(authenticationRequest);
        });
        verify(jwtService, never()).generateToken(any());
    }
}

