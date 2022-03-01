package com.polypoli.configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonConfiguration {

    @Value("${aws.accesskey}")
    private String ACCESS_KEY;

    @Value("${aws.secretKey}")
    private String SECRET_KEY;

    @Bean
    public AWSCredentials AWSCredentials() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY);
        return awsCredentials;
    }
}
