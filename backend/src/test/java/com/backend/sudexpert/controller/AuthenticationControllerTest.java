package com.backend.sudexpert.controller;

import com.backend.sudexpert.config.JwtService;
import com.backend.sudexpert.dto.AuthenticationRequest;
import com.backend.sudexpert.dto.AuthenticationResponse;
import com.backend.sudexpert.dto.RegisterRequest;
import com.backend.sudexpert.service.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthenticationController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JwtService jwtService;

    private RegisterRequest registerRequest;
    private AuthenticationRequest authenticationRequest;
    private AuthenticationResponse authenticationResponse;

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

        authenticationResponse = AuthenticationResponse.builder()
                .token("jwt.token.here")
                .build();
    }

    @Test
    void register_ShouldReturnTokenWhenSuccessful() throws Exception {
        when(authenticationService.register(any(RegisterRequest.class)))
                .thenReturn(authenticationResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.token").value("jwt.token.here"));

        verify(authenticationService, times(1)).register(any(RegisterRequest.class));
    }

    @Test
    void register_ShouldAcceptAllRequiredFields() throws Exception {
        when(authenticationService.register(any(RegisterRequest.class)))
                .thenReturn(authenticationResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        verify(authenticationService).register(argThat(request ->
                request.getFirstName().equals("John") &&
                request.getLastName().equals("Doe") &&
                request.getEmail().equals("john.doe@example.com") &&
                request.getPassword().equals("password123")
        ));
    }

    @Test
    void authenticate_ShouldReturnTokenWhenCredentialsValid() throws Exception {
        when(authenticationService.authenticate(any(AuthenticationRequest.class)))
                .thenReturn(authenticationResponse);

        mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.token").value("jwt.token.here"));

        verify(authenticationService, times(1)).authenticate(any(AuthenticationRequest.class));
    }

    @Test
    void authenticate_ShouldPassEmailAndPassword() throws Exception {
        when(authenticationService.authenticate(any(AuthenticationRequest.class)))
                .thenReturn(authenticationResponse);

        mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationRequest)))
                .andExpect(status().isOk());

        verify(authenticationService).authenticate(argThat(request ->
                request.getEmail().equals("john.doe@example.com") &&
                request.getPassword().equals("password123")
        ));
    }
}

