package com.example.NotesBuff.Notes;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.Instant;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/notes")
public class NotesController {

    private final NoteRepository noteRepository;

    public NotesController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please upload a valid file");
        }

        try {
            byte[] fileBytes = file.getBytes();

            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();

            Note note = new Note();
            note.setTitle(fileName);
            note.setContentType(contentType);
            note.setCreatedAt(Instant.now());
            note.setStatus(NoteStatus.UPLOADED);
            note.setData(fileBytes);

            noteRepository.save(note);

            System.out.println("Received File: " + fileName + " (Type: " + contentType + ", Size: " + fileBytes.length + " bytes)");

            return ResponseEntity.ok(note.getId());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing the file", e);
        }
    }
}
