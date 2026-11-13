package com.krishisarthi.config;

import com.krishisarthi.security.CustomUserDetailsService;
import com.krishisarthi.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> {})
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public Documentation & Static Files
                .requestMatchers("/api-docs/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/uploads/**", "/static/**", "/error").permitAll()
                .requestMatchers("/api/v1/health").permitAll()

                // Public Auth Endpoints
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/register",
                                 "/api/v1/auth/forgot-password-request", "/api/v1/auth/reset-password").permitAll()

                // Public Crop Traceability (QR Scan Public Certificate)
                .requestMatchers("/api/v1/traceability/**").permitAll()

                // Public Agri Market & Weather Data
                .requestMatchers("/api/v1/agri-data/**").permitAll()

                // Public Razorpay Webhook
                .requestMatchers("/api/v1/payment/webhook").permitAll()

                // Marketplace Browsing & AI (Can be used by guests or authenticated users)
                .requestMatchers(HttpMethod.GET, "/api/v1/buyer/marketplace", "/api/v1/buyer/listings/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/transporter/requests").permitAll()
                .requestMatchers("/api/v1/ai/chat").permitAll()

                // Role-Specific Secured Endpoints
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/farmer/**").hasAnyRole("FARMER", "ADMIN")
                .requestMatchers("/api/v1/buyer/**").hasAnyRole("BUYER", "ADMIN")
                .requestMatchers("/api/v1/transporter/**").hasAnyRole("TRANSPORTER", "ADMIN")
                .requestMatchers("/api/v1/payment/**").authenticated()
                .requestMatchers("/api/v1/escrow/**").authenticated()
                .requestMatchers("/api/v1/notifications/**").authenticated()
                .requestMatchers("/api/v1/auth/me", "/api/v1/auth/kyc").authenticated()

                // Any other request must be authenticated
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
