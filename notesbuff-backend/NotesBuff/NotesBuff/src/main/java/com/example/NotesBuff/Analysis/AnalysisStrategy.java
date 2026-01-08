package com.example.NotesBuff.Analysis;

import com.example.NotesBuff.Notes.Note;

public interface AnalysisStrategy {
    boolean supports(String contentType);
    AnalysisResponse analyzeNote(Note note);
}
