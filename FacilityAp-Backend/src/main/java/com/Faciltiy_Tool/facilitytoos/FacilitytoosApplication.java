package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class FacilitytoosApplication
{


	public static void main(String[] args) {
		SpringApplication.run(FacilitytoosApplication.class, args);
	}

}
