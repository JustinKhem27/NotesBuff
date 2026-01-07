package com.example.NotesBuff.Notes;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/notes")
public class NotesController {
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please upload a valid file");
        }

        try {
            byte[] fileBytes = file.getBytes();

            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();

            System.out.println("Received File: " + fileName + " (Type: " + contentType + ", Size: " + fileBytes.length + " bytes)");

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing the file", e);
        }
    }
}
