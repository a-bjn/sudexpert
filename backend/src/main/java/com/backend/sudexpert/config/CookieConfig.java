package com.backend.sudexpert.config;

public final class CookieConfig {
    public static final String AUTH_COOKIE_NAME = "auth_token";
    public static final int MAX_AGE_SECONDS = 86400; // 24 hours
    public static final String SAME_SITE = "Lax";
}
