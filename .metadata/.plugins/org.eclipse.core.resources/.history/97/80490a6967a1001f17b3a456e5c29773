package co.edu.uco.cognicare.lecturacritica.metacomprension.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.uco.cognicare.lecturacritica.metacomprension.dto.ActivityAnswerDto;
import co.edu.uco.cognicare.lecturacritica.metacomprension.service.ActivityService;

@RestController
@RequestMapping("/api")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }
    
    @Value("${spring.datasource.url}")
    private String url;

    @GetMapping("/prueba")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test success");
    }
    
    @PostMapping("/submit")
    public ResponseEntity<String> submitAnswer(@RequestBody ActivityAnswerDto activityAnswerDto) {
        boolean isCorrect = activityService.evaluateAnswer(activityAnswerDto);
        if (isCorrect) {
            return ResponseEntity.ok("Correcto! Has ganado braincoins.");
        } else {
            return ResponseEntity.ok("Incorrecto. Intenta de nuevo.");
        }
    }
    
    @PostMapping("/evaluate")
    public ResponseEntity<Boolean> evaluateAnswer(@RequestBody ActivityAnswerDto activityAnswerDto) {
        boolean isCorrect = activityService.evaluateAnswer(activityAnswerDto);
        return ResponseEntity.ok(isCorrect);
    }
}