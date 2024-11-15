package co.edu.uco.cognicare.lecturacritica.metacomprension;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
		"co.edu.uco.cognicare.lecturacritica.metacomprension.config",
		"co.edu.uco.cognicare.lecturacritica.metacomprension.dto",
		"co.edu.uco.cognicare.lecturacritica.metacomprension.model",
		"co.edu.uco.cognicare.lecturacritica.metacomprension.repository",
		"co.edu.uco.cognicare.lecturacritica.metacomprension.controller",
		"co.edu.uco.cognicare.lecturacritica.metacomprension.exception",
		"co.edu.uco.cognicare.lecturacritica.metacomprension.service",
	    "co.edu.uco.cognicare.lecturacritica.metacomprension.util"
	})
public class CognicareLecturaCriticaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CognicareLecturaCriticaApplication.class, args);
	}

}