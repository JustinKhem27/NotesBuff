package com.example.NotesBuff.Analysis;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    @GetMapping("notes/{id}")
    public AnalysisResponse analyzeNote(@PathVariable ("id") String noteId) {
        if (noteId == null || noteId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Note ID");
        }
        return new AnalysisResponse(
                noteId,
                0.85,
                List.of("Topic A", "Topic B"),
                "Consider adding more examples on Topic A and Topic B to improve coverage."
        );
    }
}
