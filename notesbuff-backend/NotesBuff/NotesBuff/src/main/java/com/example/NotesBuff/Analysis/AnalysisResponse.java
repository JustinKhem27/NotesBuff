package com.example.NotesBuff.Analysis;

import java.util.List;

public record AnalysisResponse(
        String noteId,
        double coverageScore,
        List<String> missingTopics,
        String recommendation
) {}
