package com.backend.sudexpert.controller;

import com.backend.sudexpert.config.CookieConfig;
import com.backend.sudexpert.dto.AuthenticationRequest;
import com.backend.sudexpert.dto.AuthenticationResponse;
import com.backend.sudexpert.dto.AuthResponse;
import com.backend.sudexpert.dto.RegisterRequest;
import com.backend.sudexpert.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @Value("${application.security.cookie.secure:false}")
    private boolean cookieSecure;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse httpResponse
    ) {
        AuthenticationResponse auth = service.register(request);
        setAuthCookie(httpResponse, auth.getToken());
        return ResponseEntity.ok(AuthResponse.builder().email(auth.getEmail()).build());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest request,
            HttpServletResponse httpResponse
    ) {
        AuthenticationResponse auth = service.authenticate(request);
        setAuthCookie(httpResponse, auth.getToken());
        return ResponseEntity.ok(AuthResponse.builder().email(auth.getEmail()).build());
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(@AuthenticationPrincipal UserDetails user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(AuthResponse.builder().email(user.getUsername()).build());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse httpResponse) {
        clearAuthCookie(httpResponse);
        return ResponseEntity.ok().build();
    }

    private void setAuthCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from(CookieConfig.AUTH_COOKIE_NAME, token)
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/api")
                .maxAge(CookieConfig.MAX_AGE_SECONDS)
                .sameSite(CookieConfig.SAME_SITE)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    private void clearAuthCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(CookieConfig.AUTH_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/api")
                .maxAge(0)
                .sameSite(CookieConfig.SAME_SITE)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }
}
