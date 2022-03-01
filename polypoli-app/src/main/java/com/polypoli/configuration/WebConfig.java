package com.polypoli.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Created by @author hojun on 2022-01-20
 * 
 * 
 * added [allowedMethods("*")] to user put or patch by @author cocoon
 */
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    public WebConfig() {
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://polypoli.kr/", "https://polypoli.kr/")
                .allowedMethods("*");
    }
}
