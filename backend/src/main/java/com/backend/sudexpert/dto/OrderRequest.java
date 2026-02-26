package com.backend.sudexpert.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotEmpty(message = "Order must have at least one item")
    @Valid
    private List<OrderItemRequest> items;

    @NotBlank(message = "Delivery name is required")
    @Size(max = 200)
    private String deliveryName;

    @NotBlank(message = "Delivery email is required")
    @Size(max = 255)
    private String deliveryEmail;

    @NotBlank(message = "Delivery phone is required")
    @Size(max = 50)
    private String deliveryPhone;

    @NotBlank(message = "Delivery address is required")
    @Size(max = 500)
    private String deliveryAddress;

    @NotBlank(message = "Delivery city is required")
    @Size(max = 100)
    private String deliveryCity;

    @Size(max = 100)
    private String deliveryCounty;

    @Size(max = 20)
    private String deliveryPostalCode;

    @NotBlank(message = "Delivery country is required")
    @Size(max = 100)
    private String deliveryCountry;

    @Size(max = 1000)
    private String deliveryNotes;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemRequest {
        @NotNull
        @Valid
        private ProductReference product;

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductReference {
        @NotNull(message = "Product ID is required")
        private Long id;
    }
}

