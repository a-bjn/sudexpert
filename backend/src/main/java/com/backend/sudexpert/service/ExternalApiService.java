package com.backend.sudexpert.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
public class ExternalApiService {

    @Value("${external.api.key}")
    private String apiKey;

    public String callExternalApi() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        return "API Key configured: " + (apiKey != null && !apiKey.isEmpty() ? "Yes" : "No");
    }

    public String getApiKey() {
        return apiKey;
    }
}

