package com.example.NotesBuff.Analysis;

import com.example.NotesBuff.Notes.Note;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;


@Service
public class pdfAnalysis implements AnalysisStrategy {

    @Override
    public boolean supports(String contentType) {
        return "application/pdf".equals(contentType);
    }

    @Override
    public AnalysisResponse analyzeNote(Note note) {
        byte[] data = note.getData();

        try (PDDocument document = PDDocument.load(data)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String extractedText = stripper.getText(document);

            return new AnalysisResponse(note.getId(), 1.0, List.of("PDF Prcoessed"), "Extracted "
                    + extractedText.length() + " characters from PDF");

        } catch (IOException e) {
            throw new RuntimeException("Error extracting text from PDF", e);
        }
    }

}
