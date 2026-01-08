package com.example.NotesBuff.Analysis;


import com.example.NotesBuff.Notes.Note;
import com.example.NotesBuff.Notes.NoteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    private final List<AnalysisStrategy> analysisStrategies;
    private final NoteRepository noteRepository;

    public AnalysisController(List<AnalysisStrategy> analysisStrategies, NoteRepository noteRepository) {
        this.analysisStrategies = analysisStrategies;
        this.noteRepository = noteRepository;
    }

    @GetMapping("notes/{id}")
    public AnalysisResponse analyzeNote(@PathVariable ("id") String noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));

        AnalysisStrategy strategy = analysisStrategies.stream()
                .filter(s -> s.supports(note.getContentType()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported content type: " + note.getContentType()));

        return strategy.analyzeNote(note);
    }
}
