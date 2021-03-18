package com.Faciltiy_Tool.facilitytoos;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {
    @Bean
    public WebMvcConfigurer corsConfigurer()
    {

        return new WebMvcConfigurer() {
            private final long MAX_AGE_SECS = 3600;
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200","https://vps099.ap.be")
                        .allowedMethods("GET", "POST","PUT","PATCH","DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(MAX_AGE_SECS);
            }
        };
    }
}
