package com.krishisarthi.entity;

public enum UserRole {
    FARMER,
    BUYER,
    TRANSPORTER,
    ADMIN;

    public static UserRole fromString(String roleStr) {
        if (roleStr == null) return null;
        for (UserRole role : UserRole.values()) {
            if (role.name().equalsIgnoreCase(roleStr.trim())) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown role: " + roleStr);
    }
}
