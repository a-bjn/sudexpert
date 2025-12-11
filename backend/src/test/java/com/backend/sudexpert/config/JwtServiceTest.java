package com.backend.sudexpert.config;

import com.backend.sudexpert.domain.Role;
import com.backend.sudexpert.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;
    private User testUser;
    private String secretKey = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private long jwtExpiration = 86400000; // 24 hours

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey", secretKey);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", jwtExpiration);

        testUser = User.builder()
                .id(1L)
                .email("test@example.com")
                .password("password")
                .firstName("John")
                .lastName("Doe")
                .role(Role.USER)
                .build();
    }

    @Test
    void generateToken_ShouldCreateValidToken() {
        // Act
        String token = jwtService.generateToken(testUser);

        // Assert
        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertTrue(token.split("\\.").length == 3); // JWT has 3 parts
    }

    @Test
    void extractUsername_ShouldReturnCorrectUsername() {
        // Arrange
        String token = jwtService.generateToken(testUser);

        // Act
        String username = jwtService.extractUsername(token);

        // Assert
        assertEquals("test@example.com", username);
    }

    @Test
    void isTokenValid_WithValidToken_ShouldReturnTrue() {
        // Arrange
        String token = jwtService.generateToken(testUser);

        // Act
        boolean isValid = jwtService.isTokenValid(token, testUser);

        // Assert
        assertTrue(isValid);
    }

    @Test
    void isTokenValid_WithDifferentUser_ShouldReturnFalse() {
        // Arrange
        String token = jwtService.generateToken(testUser);
        User differentUser = User.builder()
                .email("different@example.com")
                .password("password")
                .role(Role.USER)
                .build();

        // Act
        boolean isValid = jwtService.isTokenValid(token, differentUser);

        // Assert
        assertFalse(isValid);
    }

    @Test
    void generateToken_WithExtraClaims_ShouldIncludeClaims() {
        // Arrange
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", "USER");
        extraClaims.put("customClaim", "customValue");

        // Act
        String token = jwtService.generateToken(extraClaims, testUser);

        // Assert
        assertNotNull(token);
        
        // Verify claims are present
        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        
        assertEquals("USER", claims.get("role"));
        assertEquals("customValue", claims.get("customClaim"));
    }

    @Test
    void extractClaim_ShouldExtractSpecificClaim() {
        // Arrange
        String token = jwtService.generateToken(testUser);

        // Act
        Date expiration = jwtService.extractClaim(token, Claims::getExpiration);

        // Assert
        assertNotNull(expiration);
        assertTrue(expiration.after(new Date()));
    }

    @Test
    void generateToken_ShouldSetCorrectExpiration() {
        // Arrange
        String token = jwtService.generateToken(testUser);

        // Act
        Date expiration = jwtService.extractClaim(token, Claims::getExpiration);
        Date issuedAt = jwtService.extractClaim(token, Claims::getIssuedAt);

        // Assert
        long expirationTime = expiration.getTime() - issuedAt.getTime();
        assertEquals(jwtExpiration, expirationTime);
    }

    @Test
    void generateToken_ShouldSetSubject() {
        // Arrange
        String token = jwtService.generateToken(testUser);

        // Act
        String subject = jwtService.extractClaim(token, Claims::getSubject);

        // Assert
        assertEquals("test@example.com", subject);
    }
}

