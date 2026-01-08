package com.example.NotesBuff.Analysis;

import com.example.NotesBuff.Notes.Note;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;


@Service
public class textAnalysis implements AnalysisStrategy {

    @Override
    public boolean supports(String contentType) {
        return "text/plain".equals(contentType);
    }

    @Override
    public AnalysisResponse analyzeNote(Note note) {
        byte[] data = note.getData();


        try {
            String extractedText = new String(data, StandardCharsets.UTF_8);
            return new AnalysisResponse(note.getId(), 1.0, List.of("Plaintext Prcoessed"), "Extracted "
                    + extractedText.length() + " characters from plaintext");
        } catch (RuntimeException e) {
            throw new RuntimeException("Error extracting text from plaintext file", e);
        }
    }
}